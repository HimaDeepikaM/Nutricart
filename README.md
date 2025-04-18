# Nutricart
Nutricart - Online Grocery Shopping

## User Functions
1. Search for recipes/ingredients
2. Add full recipes/ingredient to cart
    - Increase/Decrease number of items
    - Remove certain ingredients from recipe (Option is available, implementation is not done)
3. Save recipes/items as a favorite to reference later
4. Add allergens to user profile
    - Creates orange warning symbol on items that contain a given allergen

## Project Installation

1. Clone git repo
```
git clone https://github.com/HimaDeepikaM/Nutricart.git
```

2. Navigate into `Nutricart` directory

3. Install Depenedencies
``` 
npm install
```
4. Start in development mode
``` 
npm start
```
This should open a browser with the app loaded. If it does not you can view product at [http://localhost:3000](http://localhost:3000).


## Notes
- User login does not currently persist across reloads. All functionalities work except for the profile page and allergens without a logged in user. 