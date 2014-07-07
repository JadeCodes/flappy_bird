// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

// Creates a new 'main' state that wil contain the game
var main_state = {

    // Function called first to load all the assets
    preload: function() { 
		
        // Change the background color of the game
        this.game.stage.backgroundColor = '#7F7F7F';

        // Load the bird sprite
        this.game.load.image('bird', 'assets/ball.png'); 

        // Load the pipe sprite
        this.game.load.image('pipe', 'assets/pipe.png'); 
    },

    // Fuction called after 'preload' to setup the game
    create: function() { 
        // Display the bird on the screen - numbers are x/y co-ordinates
        this.bird = this.game.add.sprite(100, 245, 'bird');

        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 500;  

        // Call the 'jump' function when the spacekey is hit
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump, this);    

        // Create a group of pipes
        this.pipes = game.add.group();  
        this.pipes.createMultiple(20, 'pipe');  

        // Calls a pipe every 1.5 seconds
        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);   
    },
    
    // Function called 60 times per second
    update: function() {
        // If the bird is out of the world (too high or too low), call the 'restart_game' function
        if (this.bird.inWorld == false)
        this.restart_game();
    },

    // Make the bird jump 
    jump: function() {  
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -250;
    },

    // Add a pipe into the game
    add_one_pipe: function(x, y) {  
        // Get the first dead pipe of our group
        var pipe = this.pipes.getFirstDead();

        // Set the new position of the pipe
        pipe.reset(x, y);

        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200; 

        // Kill the pipe when it's no longer visible 
        pipe.outOfBoundsKill = true;
    },

    // Add a row of pipes into the game
    add_row_of_pipes: function() {  
        var hole = Math.floor(Math.random()*5)+1;

        for (var i = 0; i < 8; i++)
        if (i != hole && i != hole +1) 
            this.add_one_pipe(400, i*60+10);   
    },

    // Restart the game
        restart_game: function() {  
        this.game.time.events.remove(this.timer);  
        // Start the 'main' state, which restarts the game
        this.game.state.start('main');
    },

    };

// Add and start the 'main' state to start the game
game.state.add('main', main_state);  
game.state.start('main'); 