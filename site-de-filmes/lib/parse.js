"use client";
import Parse from "parse/dist/parse.min.js";

Parse.initialize(
  "cD9jEFyGPjTpHAlNCEg65EjwFlq2O48oSGvmOjlx", 
  "i93Bcnfs6baywgOzUjtlt8K4FxrKKpoJDWZZ9Qle"  
);
Parse.serverURL = "https://parseapi.back4app.com/";

export default Parse;
