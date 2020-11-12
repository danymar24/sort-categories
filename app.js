module.exports = function sortCategoriesForInsert(inputJson) {
    // Your code happens...
    ///   ... which calculates properJsonOutput

    /** Converts the inputJson value to a javascript readable object */
    const parsedJson = JSON.parse(inputJson);
    var properJsonOutput = [];

    /**
     * Iterate trough the root categories to get the sub categories
     */
    for (let i = 0; i < parsedJson.length; i++) {
        const element = parsedJson[i];
        /** If the category is a root category, it will push it to properJsonOutput */
        if (element.parent_id === null) {
            /** push the root element to the properJsonOutput */
            properJsonOutput.push(element);

            /** 
             * Gets the subcategories passing the id of the element and the array, 
             * then concatenates the result to the properJsonOutput array 
             */
            properJsonOutput = properJsonOutput.concat(findSubCategories(element.id, parsedJson));
        }
    }

    /** Returns the sorted array as JSON string*/
    return JSON.stringify(properJsonOutput);
}

/**
 * @function findSubCategories Gets the subcategories of a given id.
 * 
 * @param {id} Number The id of the root category.
 * @param {array} Array<Object> The original array of categories.
 * 
 * @return Array<Object> The sorted sub categories.
 */
function findSubCategories(id, array) {
    let sortedCategories = [];

    /** Loops trough the subcategories array */
    for (let i = 0; i < array.length; i++) {
        const element = array[i];

        if (element.parent_id === id) {
            /** adds the current category to the sortedCategories array */
            sortedCategories.push(element);

            /** 
             * Finds the sub categories of the current category,
             * this helps when there are nested subcategories, as it will iterate
             * until there are no more nested subcategories.
             */
            sortedCategories = sortedCategories.concat(findSubCategories(element.id, array));
        }
    }

    return sortedCategories;
}