'use strict';

import DB from './StorageUtil';

class CategoryUtils {
    /**
     * Return all active categories
     * 
     * @returns {Promise<Object[]>} An array of categories
     */
    getCurrentCategories() {
        return DB.categories.toArray();
    }
    /**
     * Add a new category to DB
     * 
     * @param {Object} category A new category
     * @returns {Promise<Object>} The fresh category with id
     */
    addCategory(category) {
        return new Promise( (resolve, reject) => {
            DB.categories.add(category)
                .then( id => {
                    category.id = id;
                    resolve(category)
                })
                .catch(reject);
        } );
        
    }
}