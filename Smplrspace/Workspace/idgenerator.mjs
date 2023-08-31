// import Chance from 'chance'
import {Chance} from "chance";

const chance = new Chance()

console.log(chance.guid());

export const iD_Gen = chance.guid();