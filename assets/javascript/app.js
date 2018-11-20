$(document).ready(function(){
    
    var questionArray = [
        {
            question: "What happened to Harry's Nimbus 2000 when the Dementors came to a Quidditch match?",
            answerChoices: ["He lost it", "It flew into the Whomping Willow", "Malfoy stole it", "Fluffy ate it"],
            correctAnswer: 1
        },
        {
            question: "In what month is Harry Potter's birthday?",
            answerChoices: ["November", "March", "June", "July"],
            correctAnswer: 3
        },
        {
            question: "What profession are Hermione Granger's Muggle parents?",
            answerChoices: ["Chefs", "Dentists", "Opticians", "Artists"],
            correctAnswer: 1
        },
        {
            question: "Who was Harry's third Defence Against the Dark Arts teacher?",
            answerChoices: ["Professor Lockhart", "Professor Snape", "Professor Lupin", "Professor Quirrel"],
            correctAnswer: 2
        },
        {
            question: "What colour were the sparks that flew out of Harry's wand the first time he held it?",
            answerChoices: ["Blue and silver", "Gold and orange", "Red and gold", "Gold and silver"],
            correctAnswer: 2
        },
        {
            question: "The crowing of which animal is fatal to a Basilisk?",
            answerChoices: ["A toad", "A chicken", "A spider", "A rooster"],
            correctAnswer: 3
        },
        {
            question: "In which Quidditch position did Oliver Wood play when he was still at Hogwarts?",
            answerChoices: ["Chaser", "Beater", "Keeper", "Seeker"],
            correctAnswer: 2
        },
        {
            question: "What do the passwords for Dumbledore's office all have in common?",
            answerChoices: ["Names of sweets", "Names of spells", "Names of professors", "Names of fruit"],
            correctAnswer: 0
        },
        {
            question: "What is the name of the ancient Weasley family owl?",
            answerChoices: ["Errol", "Fluffy", "Aragog", "Hedwig"],
            correctAnswer: 0
        },
        {
            question: "Which language, like Voldemort, is Harry able to speak?",
            answerChoices: ["Mermish", "Parseltongue", "Elfish", "Troll"],
            correctAnswer: 1
        }];

        var index = 0;
        var correctAnswers;
        var incorrectAnswers;
        var noAnswer;
        var counter = 20;
        var countDown; 
        
        
        $('#start-button').on('click', function(){
            $("#top-buttons").hide();
            $("#start-game").hide();
            $(".timer").show();
            gameFunction();
            timer();
            correctAnswers = 0;
            incorrectAnswers = 0;
            noAnswer = 0;
        });

        function gameFunction() {
            $(".question").html("<p class='question-text'>" + questionArray[index].question + "</p>");
            answerInput = "<p class='answerChoice'>" + questionArray[index].answerChoices[0] + "</p><p class='answerChoice'>"+ questionArray[index].answerChoices[1] +"</p><p class='answerChoice'>"+ questionArray[index].answerChoices[2] +"</p><p class='answerChoice'>"+ questionArray[index].answerChoices[3] +"</p>";
            $(".answers").html(answerInput);
        };

        function timer() {
            $(".timer").show();
            countDown = setInterval(quizCounter, 1000);
            function quizCounter () {
                if (counter === 0) {
                    clearInterval(countDown);
                    timeoutAnswer();
                }
                if (counter > 0) {
                    counter--;
                }
                $(".timer-display").html(counter);
            };
        };
        
        function questionAnswered() {
            if (index < 9) {
                index++;	
                console.log("index: " + index);
                gameFunction();
                $(".results").empty();
                $(".timer").show();
                counter = 20;
                timer();
            } 
            else {
                gameOver();
            }
        };
        
        $(".answers").on("click", ".answerChoice", function(event) {
            answerChoice = $(this).text();
            rightAnswer = questionArray[index].answerChoices[questionArray[index].correctAnswer];
            console.log("answerChoice: " + answerChoice);
            console.log("rightAnswer: " + rightAnswer);
            clearInterval(countDown)
            if (answerChoice === rightAnswer) {
                correctAnswer();
            } else if (answerChoice !== rightAnswer) {
                wrongAnswer();
            } 
        });
                
        $('#restart-button').on('click', function(){
            $(this).hide();
            reset();
        });
        
                
        function correctAnswer() {
            correctAnswers++;
            console.log("correctAnswers: " + correctAnswers);
            $(".question").empty();
            $(".timer").hide();
            $(".answers").empty();
            $(".results").html("<p class='answer-message'>Congratulations! That was the correct answer!</p>");
            setTimeout(questionAnswered, 3000);
        };
        
        function wrongAnswer() {
            incorrectAnswers++;
            console.log("incorrectAnswers: " + incorrectAnswers);
            $(".question").empty();
            $(".timer").hide();
            $(".answers").empty();
            $(".results").html("<p class='answer-message'>Sorry, that wasn't right!</p>" + "<p class='correct-message'>The correct answer was </p>" + "<p class ='correct-answer'>" + questionArray[index].answerChoices[questionArray[index].correctAnswer] + ".</p>");
            setTimeout(questionAnswered, 3000);
        };
        
        function timeoutAnswer() {
            noAnswer++;
            console.log("noAnswer:" + noAnswer);
            console.log("correctAnswer: " + correctAnswer);
            $(".question").empty();
            $(".timer").hide();
            $(".answers").empty();
            $(".results").html("<p class='answer-message'>Sorry, time's up!</p>" + "<p class='correct-message'>The correct answer was </p>" + "<p class ='correct-answer'>" + questionArray[index].answerChoices[questionArray[index].correctAnswer] + ".</p>");
            setTimeout(questionAnswered, 3000);
        };
        
        function reset() {
            $(".question").empty();
            $(".timer").hide();
            $(".answers").empty();
            $(".results").empty();
        
            index = 0;
            correctAnswers = 0;
            incorrectAnswers = 0;
            noAnswer = 0;
            counter = 20;
        
            gameFunction();
            timer();
        };
        
        function gameOver() {
            $(".question").empty();
            $(".timer").hide();
            $(".answers").empty();
            $(".results").html("<p class='results'>Your Results:</p>" + "<p class='results'>Correct Answers: " + correctAnswers + "</p>" + "<p class='results'>Wrong Answers: " + incorrectAnswers + "</p>"+ "<p class='results'>Unanswered: " + noAnswer + "</p>");
            $("#restart-button").show();
        };
        
    });
        
        