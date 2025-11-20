"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from '@/context/ThemeContext';

export default function ContributionGraph() {
    const { theme } = useTheme();

    return (
        <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300/50'} p-4 lg:p-6 shadow-sm`}>
            <div className="mb-4">
                <h3 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'} mb-4`}>
                    Contribution Activity
                </h3>
            </div>
            <div className="flex justify-center items-center">
                <div className="overflow-x-auto">
                    {/* <GitHubCalendar
                        username="arifrexa"
                        colorScheme={theme === 'dark' ? 'dark' : 'light'}
                        blockSize={25}        // Bigger squares
                        blockRadius={8}
                        fontSize={18}
                    /> */}
                    <GitHubCalendar
                        /* ---------------------------------------------
                           Required
                        ---------------------------------------------- */
                        username="arifrexa"               // GitHub username to fetch contribution data for.

                        /* ---------------------------------------------
                           Display Settings
                        ---------------------------------------------- */
                        year="last"                       // Which year to show: specific year (e.g., 2024) or "last" (default).
                        colorScheme={theme === "dark" ? "dark" : "light"}
                        // Force light or dark mode. If omitted = auto-detect system theme.
                        fontSize={18}                 // Font size for month labels, total count, etc.
                        showMonthLabels={true}            // Show month names at the top.
                        showWeekdayLabels={true}         // Show weekday initials (Sun/Mon/Fri); can also provide custom array.
                        showTotalCount={true}             // Show total contribution count under the calendar.
                        showColorLegend={true}            // Show the color intensity legend under the calendar.
                        weekStart={0}                     // 0 = Sunday, 1 = Monday, etc.

                        /* ---------------------------------------------
                           Block (Square) Appearance
                        ---------------------------------------------- */
                        blockSize={20}                    // Size of each square (px).
                        blockMargin={4}                   // Gap between squares.
                        blockRadius={5}                   // Rounded corners on each square (px).
                        maxLevel={4}                      // Contribution intensity levels (0–4 default).

                        /* ---------------------------------------------
                           Custom Rendering (Advanced)
                        ---------------------------------------------- */
                        renderBlock={undefined}           // Custom renderer for each block (rarely needed).
                        renderColorLegend={undefined}     // Custom renderer for legend blocks.

                        /* ---------------------------------------------
                           Themes & Coloring
                        ---------------------------------------------- */
                        // Custom color themes for light/dark modes.
                        // Example:
                        theme={{
                            light: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
                            dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                        }}

                        /* ---------------------------------------------
                           Tooltips
                        ---------------------------------------------- */
                        // tooltips={{}}                     // Customize tooltip formatting on hover.

                        // tooltips={{
                        //     activity: {
                        //         text: activity => `${activity.level} activities on ${activity.date}`,
                        //         placement: 'right',
                        //         offset: 6,
                        //         hoverRestMs: 300,
                        //         transitionStyles: {
                        //             duration: 100,
                        //             common: { fontFamily: 'monospace' },
                        //         },
                        //         withArrow: true,
                        //     },
                        // }}

                        /* ---------------------------------------------
                           Error Handling
                        ---------------------------------------------- */
                        errorMessage="Failed to load contributions"
                        // Message shown if something fails (only if throwOnError=false).
                        throwOnError={false}              // Throw error instead of silently handling it.

                        /* ---------------------------------------------
                           Loading State
                        ---------------------------------------------- */
                        loading={false}                   // Force loading UI manually (usually unnecessary).
                        // data={undefined}                  // Provide custom data instead of fetching from GitHub.

                        /* ---------------------------------------------
                           Container Styling
                        ---------------------------------------------- */
                        style={{                             // Increase width as you like
                            color: theme === "dark" ? "#ffffff" : "#000000", // Fix unreadable text in light mode
                        }}

                        /* ---------------------------------------------
                           Ref
                        ---------------------------------------------- */
                        ref={null}                        // Access the DOM node (optional)
                    />

                </div>
            </div>
        </div>
    );
}
