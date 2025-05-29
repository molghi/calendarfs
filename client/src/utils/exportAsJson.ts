import { Event, Occurrence } from "../context/MyContext";

// Export as JSON

function exportAsJson(data: { events: Event[]; occurrences: Occurrence[] }): void {
    // Compose file name
    const now: Date = new Date();
    const filename: string = `calendar-export--${now.getDate()}-${now.getMonth() + 1}-${now
        .getFullYear()
        .toString()
        .slice(2)}--${now.getHours()}-${now.getMinutes()}.json`;

    // Convert data to JSON: Convert the JavaScript object 'data' into a formatted JSON string. The 'null, 2' arguments ensure the output is pretty-printed with 2-space indentation for readability.
    const json: string = JSON.stringify(data, null, 2);

    // Create a blob: Create a binary large object (Blob) containing the JSON string, specifying the MIME type as 'application/json' to ensure it's recognised as a JSON file.
    const blob: Blob = new Blob([json], { type: "application/json" });

    // Create a download URL: Generate a temporary URL pointing to the Blob, enabling it to be downloaded as a file by associating it with a download link.
    const url: string = URL.createObjectURL(blob);

    // Create an invisible anchor element for downloading
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = url;
    link.download = filename;

    // Click programmatically and remove right away
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL
    URL.revokeObjectURL(url);
}

export default exportAsJson;
