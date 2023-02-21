
export const getCanvasMousePosition = (canvasRect, mousePosition) => {
    return {
        x: mousePosition.x - canvasRect.left,
        y: mousePosition.y - canvasRect.top
    }
}