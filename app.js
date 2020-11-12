module.exports = function sortCategoriesForInsert(inputJson) {
    // Your code happens...
    ///   ... which calculates properJsonOutput

    var properJsonOutput = [];

    /**
     * To initialize the sort I find all the root categories, if the parent_id value is null,
     * it means it is a root category
    */
    const rootCategory = inputJson.filter(category => category.parent_id === null);

    /**
     * Iterate trough the root categories to get the sub categories
     */
    for (let i = 0; i < rootCategory.length; i++) {
        const element = rootCategory[i];
        /** push the root element to the properJsonOutput */
        properJsonOutput.push(element);

        /** 
         * Gets the subcategories passing the id of the element and the array, 
         * then concatenates the result to the properJsonOutput array 
         */
        properJsonOutput = properJsonOutput.concat(findSubCategories(element.id, inputJson));
    }

    /** Returns the sorted array */
    return properJsonOutput
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

    /** 
     * Filters the categories of the given id, 
     * will assign the array of categories if the value parent_id equals the given id
     */
    const subCategoriesFromId = array.filter(category => category.parent_id === id);
    /** Loops trough the subcategories array */
    for (let i = 0; i < subCategoriesFromId.length; i++) {
        const element = subCategoriesFromId[i];

        /** adds the current category to the sortedCategories array */
        sortedCategories.push(element);

        /** 
         * Finds the sub categories of the current category,
         * this helps when there are nested subcategories, as it will iterate
         * until there are no more nested subcategories.
         */
        sortedCategories = sortedCategories.concat(findSubCategories(element.id, array));
    }

    return sortedCategories;
}