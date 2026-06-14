const { sequelize, User, Recipe, Comment, Rating } = require('../models');
const { hashPassword } = require('../utils/password');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');

    // Sync database
    await sequelize.sync({ force: true });
    console.log('✅ Database synced');

    // Create users
    const users = await User.bulkCreate([
      {
        username: 'chef_john',
        password: await hashPassword('password123'),
        email: 'john@example.com',
      },
      {
        username: 'foodie_jane',
        password: await hashPassword('password123'),
        email: 'jane@example.com',
      },
      {
        username: 'master_chef',
        password: await hashPassword('password123'),
        email: 'chef@example.com',
      },
    ]);
    console.log(`✅ Created ${users.length} users`);

    // Create recipes
    const recipes = await Recipe.bulkCreate([
      {
        title: 'Classic Spaghetti Carbonara',
        content: 'A traditional Italian pasta dish made with eggs, cheese, pancetta, and black pepper. Cook pasta al dente, mix with beaten eggs and cheese, add crispy pancetta, and toss until creamy.',
        userId: users[0].id,
        category: 'Italian',
        cookingTime: 30,
        servings: 4,
        imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500',
      },
      {
        title: 'Homemade Pizza Margherita',
        content: 'Classic Neapolitan pizza with fresh tomatoes, mozzarella cheese, basil, and olive oil on a thin crispy crust.',
        userId: users[1].id,
        category: 'Italian',
        cookingTime: 45,
        servings: 6,
        imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500',
      },
      {
        title: 'Thai Green Curry',
        content: 'Aromatic Thai curry with coconut milk, green curry paste, vegetables, and your choice of protein. Serve with jasmine rice.',
        userId: users[2].id,
        category: 'Thai',
        cookingTime: 35,
        servings: 4,
        imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500',
      },
      {
        title: 'Classic Beef Burger',
        content: 'Juicy beef patty with fresh lettuce, tomato, cheese, and special sauce on a toasted brioche bun.',
        userId: users[0].id,
        category: 'American',
        cookingTime: 25,
        servings: 4,
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
      },
      {
        title: 'Chocolate Lava Cake',
        content: 'Decadent chocolate cake with a molten center. Serve warm with vanilla ice cream for the perfect dessert.',
        userId: users[1].id,
        category: 'Dessert',
        cookingTime: 20,
        servings: 4,
        imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500',
      },
    ]);
    console.log(`✅ Created ${recipes.length} recipes`);

    // Create comments
    const comments = await Comment.bulkCreate([
      {
        text: 'This recipe is amazing! My family loved it.',
        recipeId: recipes[0].id,
        userId: users[1].id,
      },
      {
        text: 'I added some extra garlic and it turned out perfect!',
        recipeId: recipes[0].id,
        userId: users[2].id,
      },
      {
        text: 'Best pizza I\'ve ever made at home. The crust was perfect!',
        recipeId: recipes[1].id,
        userId: users[0].id,
      },
      {
        text: 'The curry was delicious but quite spicy. Will make again!',
        recipeId: recipes[2].id,
        userId: users[1].id,
      },
      {
        text: 'These burgers are restaurant quality. Highly recommend!',
        recipeId: recipes[3].id,
        userId: users[2].id,
      },
    ]);
    console.log(`✅ Created ${comments.length} comments`);

    // Create ratings
    const ratings = await Rating.bulkCreate([
      { recipeId: recipes[0].id, userId: users[1].id, rating: 5 },
      { recipeId: recipes[0].id, userId: users[2].id, rating: 4 },
      { recipeId: recipes[1].id, userId: users[0].id, rating: 5 },
      { recipeId: recipes[2].id, userId: users[1].id, rating: 4 },
      { recipeId: recipes[3].id, userId: users[2].id, rating: 5 },
      { recipeId: recipes[4].id, userId: users[0].id, rating: 5 },
    ]);
    console.log(`✅ Created ${ratings.length} ratings`);

    console.log('🎉 Database seeded successfully!');
    console.log('\n📝 Test Accounts:');
    users.forEach(user => {
      console.log(`  Username: ${user.username} | Password: password123`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
