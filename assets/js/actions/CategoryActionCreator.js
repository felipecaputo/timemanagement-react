'use strict';

import CategoryUtils from '../util/CategoryUtils';
import Dispatcher from '../dispatcher/TMDispatcher';
import CategoryCons from '../constants/CategoryConstants';

class CategoryActionCreator {
    createCategory(category){
        Dispatcher.handleClientAction({
            type: CategoryCons.CATEGORY_ADDING,
            category: category
        });
        CategoryUtils.addCategory(category)
            .then( newCat => {
                Dispatcher.handleClientAction({
                    type: CategoryCons.CATEGORY_ADDED,
                    category: newCat
                })
            })
            .catch( err => {})
    }
}