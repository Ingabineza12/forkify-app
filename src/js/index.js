// Global app controller
//import string from './models/Search';  // 1st method to import

//import { add as a, num, mult as m } from './view/searchView';          //2nd method
//console.log(`using the imported functions ${a(num , 4)} and ${m(num , 2)}. ${string}`);

//import * as searchView from './view/searchView'; // 3rd method
//console.log(`using the imported functions ${searchView.add(searchView.num , 4)} and ${searchView.mult(25, 2)}. ${string}`);

import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './view/searchView';
import { elements, renderLoader, clearLoader } from './view/base';


/** Global state of the app
 * - search object
 * - current recipe object
 * - shopping list object
 * - liked recipes
 */

 /**
 * RECIPE CONTROLLER
 */

const state = {};

const controlSearch = async () => {        //async f(x) always return a promise
    //1) get query from view
    const query = searchView.getInput();
    //console.log(query);

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query); 

        // 3) prepare UI for the results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try{
            // 4) search for recipes (receive results from API) && retuns a promise
        await state.search.getResults();

        // 5) Render results on UI (we want it to happen after 4 so 4 is awaited and the f(x) made async)
        clearLoader();
        searchView.renderResults(state.search.results);
         
        } catch(err) {
            alert('something went wrong with the search...');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();   // to avoid the reload after clicking search
    controlSearch();

});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline'); // selecting the whole button class not it's children 
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10); // parseInt to make it int and 10 to put it to base 10
        searchView.clearResults();
        searchView.renderResults(state.search.results, goToPage);
    }
    
});

/**
 * RECIPE CONTROLLER
*/
const controlRecipe = () => {
    // get ID from url
    const id = window.location.hash.replace('#', ' ');
    console.log(id);

    if (id){
        // 1) prepare UI for changes

        // 2) create new recipe object
        state.recipe = new Recipe(id);

        try{
            // 3) get recipe data and parse ingredients
            state.recipe.getRecipe();      // await
            state.recipe.parseIngredients();

            /*//4) calculate servings and time
            state.recipe.calcTime();
            */
            state.recipe.calcServings();
            
            //5)render recipe
            console.log(state.recipe);

        }catch(error){
            alert('Error processing recipe');
        }
        

    }
};


//window.addEventListener('hashchange', controlRecipe); // add event listener to the global object in js(so the browser)
//window.addEventListener('load' , controlRecipe); // event listener which fires whenever a page is loaded


['hashchange' , 'load'].forEach(event => window.addEventListener(event,controlRecipe));



