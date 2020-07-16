/*export default'I am an exported string';*/

import axios from 'axios';

export default class Search{
    constructor(query){
        this.query = query;
}
async getResults (){
    const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
    //console.log(res);

    this.results = res.data.recipes;
    //console.log(this.results);
}

}
