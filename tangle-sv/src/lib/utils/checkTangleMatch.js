export function checkTangleMatch(group, tangle) {
    for (const row of tangle) {
        if (row.title === "joker") continue;

        // Convert both current group and row data to uppercase
        const normalizedGroup = group.map((item) =>
            item.toUpperCase(),
        );
        const normalizedRowData = row.data.map((item) =>
            item.toUpperCase(),
        );

        // Check if every item in the current group exists in the row's data
        const isMatch =
            normalizedGroup.every((item) =>
                normalizedRowData.includes(item),
            ) && normalizedGroup.length === normalizedRowData.length;

        // If all items match, return the row title
        if (isMatch) {
            return {
                matched: true,
                title: row.title,
            };
        }
    }

    return {
        matched: false,
        title: null,
    };
}