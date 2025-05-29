function checkNewColor(newColor: string): string {
    // Mimick DOM addition to get the computed color
    const span = document.createElement("span");
    document.body.appendChild(span);
    span.style.color = newColor;
    let color = window.getComputedStyle(span).color;
    document.body.removeChild(span);

    // Get just the rgb values (r,g,b)
    const rgbValues = color
        .slice(4, -1)
        .split(",")
        .map((x) => +x.trim());

    // Return safe color: the input in rgb or green (browser default) if it is too dark
    const threshold = 40; // Darkness threshold
    if (rgbValues[0] < threshold && rgbValues[1] < threshold && rgbValues[2] < threshold) return `rgb(0, 128, 0)`;

    return color;
}

export default checkNewColor;
