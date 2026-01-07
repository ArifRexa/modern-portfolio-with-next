import { NextResponse } from 'next/server';
import { initializeSupabase, parseJsonbField } from '@/utils/supabaseCodingUtils';

export async function GET() {
    try {
        const supabase = initializeSupabase();

        // Fetch the last 30 days of data
        const { data, error } = await supabase
            .from('daily_coding_time_details')
            .select('*')
            .order('date', { ascending: false })
            .limit(30);

        if (error) throw error;

        if (!data || data.length === 0) {
            return NextResponse.json({
                success: true,
                data: null,
                message: 'No data available to calculate averages'
            });
        }

        // Helper to aggregate data
        const aggregateCategory = (entries, categoryField) => {
            const totals = {};
            let grandTotalHours = 0;

            entries.forEach(entry => {
                const items = parseJsonbField(entry[categoryField] || []);
                items.forEach(item => {
                    const hours = parseFloat(item.decimal || 0);
                    if (!totals[item.name]) {
                        totals[item.name] = {
                            name: item.name,
                            totalHours: 0,
                            // For projects, track additions/deletions if available
                            humanAdditions: 0,
                            humanDeletions: 0
                        };
                    }
                    totals[item.name].totalHours += hours;

                    if (categoryField === 'projects') {
                        totals[item.name].humanAdditions += (item.human_additions || 0);
                        totals[item.name].humanDeletions += (item.human_deletions || 0);
                    }
                    grandTotalHours += hours;
                });
            });

            // Convert to array and calculate averages
            const daysCount = entries.length; // or 30? Use actual data points for average per active day

            const averaged = Object.values(totals).map(item => {
                const avgHours = item.totalHours / daysCount;
                return {
                    name: item.name,
                    decimal: avgHours.toFixed(2),
                    text: `${Math.floor(avgHours)}h ${Math.round((avgHours % 1) * 60)}m`,
                    percent: grandTotalHours > 0 ? ((item.totalHours / grandTotalHours) * 100).toFixed(2) : 0,
                    // Projects specific
                    human_additions: Math.round(item.humanAdditions / daysCount),
                    human_deletions: Math.round(item.humanDeletions / daysCount)
                };
            });

            return averaged.sort((a, b) => parseFloat(b.decimal) - parseFloat(a.decimal));
        };

        const averages = {
            editors: aggregateCategory(data, 'editors'),
            languages: aggregateCategory(data, 'languages'),
            projects: aggregateCategory(data, 'projects'),
            operating_systems: aggregateCategory(data, 'operating_systems'),
        };

        return NextResponse.json({
            success: true,
            data: averages,
            range: '30 days'
        });

    } catch (error) {
        console.error('Error calculating averages:', error);
        return NextResponse.json({ error: 'Failed to fetch averages', message: error.message }, { status: 500 });
    }
}
