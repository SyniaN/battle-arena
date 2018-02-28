const calcPath = (array, width, start, end) => {
    if (
        array !== undefined &&
        width !== undefined &&
        start !== undefined &&
        end !== undefined
    ) {
        return depthFirstCalc(array, width, start, end)
        //return breathFirstCalc(array, width, start, end)
    } else {
        return []
    }
}

const findNeighbors = (array, width, node) => {
    let result = []

    //TODO: Handle when the nodes are against the edges
    if (node % width < width - 1 && !array[node + 1].blocked) {
        result.push(node + 1)
    }

    if (node % width > 0 && !array[node - 1].blocked) {
        result.push(node - 1)
    }

    if (node / width < width - 1 && !array[node + width].blocked) {
        result.push(node + width)
    }

    if (node / width >= 1 && !array[node - width].blocked) {
        result.push(node - width)
    }
    return result
}

const depthFirstCalc = (array, width, start, end) => {
    let stack = []
    let path = []
    stack.push(start)
    let found = false
    while (!found) {
        const curNode = stack.pop()
        console.log("curNode: " + curNode)

        array[curNode].visited = true

        path.push(curNode)

        if (curNode === undefined) {
            found = true
            console.log("found")
            break
        }

        const neighbors = findNeighbors(array, width, curNode)
        console.log(curNode)
        console.log(neighbors)

        let added = 0

        for (let i = 0; i < neighbors.length; i++) {
            if (neighbors[i] === end) {
                found = true
                break
            } else if (!array[neighbors[i]].visited) {
                stack.push(neighbors[i])
                array[neighbors[i]].visited = true
                added++
            }
        }

        console.log(added + " added to stack")
        console.log(stack)
        if (added === 0 && found === false) {
            path.pop()
        }
    }

    console.log(path)
    return path
}

//const breathFirstCalc = (array, width, start, end) => {}

export default calcPath