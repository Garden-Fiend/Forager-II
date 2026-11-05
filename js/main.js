import { getFormData } from "./crudders.js";
import { makeForageCard } from "./renderer.js";
import { wireListeners } from "./crudders.js";

makeForageCard();
getFormData();
wireListeners();