
class Model {
    constructor() {}
    predict(recipe){}
    async setup(){}
}

function euclideanDistance(point1, point2) {
    return Math.sqrt(point1.reduce((sum, val, i) => sum + Math.pow(val - point2[i], 2), 0));
}

export class Birch extends Model {
    constructor(data_url, model_desc){
        super()

        this.data_url = data_url

        // used to destinguise diffrent birch models
        this.model_desc = model_desc
        this.setup().then()
    }

    async setup() {
        const res = await fetch(this.data_url)
        this.centers  = await res.json()
    }

    predict(input_recipe) {
        let minDistance = Infinity;
        let predictedLabel = -1;

        this.centers.forEach((center, idx) => {
            const dist = euclideanDistance(input_recipe, center);
            if (dist < minDistance) {
                minDistance = dist;
                predictedLabel = idx;
            }
        });
        return predictedLabel;
    }


}

/**
 * Works the same way as birch model:
 */
export class KMeans extends Birch {
    constructor(data_url, model_desc) {
        super(data_url, model_desc)
    }
    predict(recipe) {
        super.predict(recipe);
    }
}






export class GMM extends Model {
    constructor(data_url, model_desc) {
        super();



        this.setup()
    }


    async setup() {

    }

    predict(recipe) {

    }
}












export const availableModels = {
    "birch_1_7": "assets/data/birch_1_7/birch_centers_1_7.json"
}