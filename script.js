$("document").ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    // Init game
    //window.current_level = 1;
    //window.experience_points = 0;
    window.number_of_levels = 10;
    window.points_per_level = 100;
    window.current_exercise_type = 'ID001';
    window.is_logged_in = false;
    window.consecutive_successes = 0;
    window.consecutive_fails = 0;
    window.bonus_points = 0;
    window.hint_used = false;
    window.all_books = [
      'Geneza', 'Exodul', 'Levitic',
      'Numeri', 'Deuteronom', 'Iosua', 'Judecători',
      'Rut', '1 Samuel', '2 Samuel', '1 Împăraţi', '2 Împăraţi',
      '1 Cronici', '2 Cronici', 'Ezra', 'Neemia', 'Estera',
      'Iov', 'Psalmii', 'Proverbe', 'Eclesiastul', 'Cântarea cântărilor',
      'Isaia', 'Ieremia', 'Plângerile lui Ieremia', 'Ezechiel', 'Daniel',
      'Osea', 'Ioel', 'Amos', 'Obadia', 'Iona', 'Mica', 'Naum', 'Habacuc',
      'Țefania', 'Hagai', 'Zaharia', 'Maleahi', 'Matei', 'Marcu', 'Luca',
      'Ioan', 'Faptele Apostolilor', 'Romani', '1 Corinteni', '2 Corinteni',
      'Galateni', 'Efeseni', 'Filipeni', 'Coloseni', '1 Tesaloniceni',
      '2 Tesaloniceni', '1 Timotei', '2 Timotei', 'Tit', 'Filimon', 'Evrei',
      'Iacov', '1 Petru', '2 Petru', '1 Ioan', '2 Ioan', '3 Ioan',
      'Iuda', 'Apocalipsa'];
    // window.texts = [ ]; - see verses.js
    window.current_text = "aaa";
    window.old_text = "aaa";

    // Definition of exercises types
    window.exercises_types = {
        'ID001': {
            'plugin_name': 'blank_words',
            'title': 'Cuvinte lipsă',
            'description': 'Mută cuvintele la locul potrivit.',
            'points': 1
        },
        'ID002': {
            'plugin_name': 'fill_reference',
            'title': 'Referința lipsă',
            'description': 'Introdu referința pentru acest text:',
            'points': 3
        },
        'ID003': {
            'plugin_name': 'fill_text',
            'title': 'Scrie textul',
            'description': 'Introdu textul pentru această referință:',
            'points': 5
        },
        'ID004': {
            'plugin_name': 'fill_by_first_letter',
            'title': 'Prima literă',
            'description': 'Completează cuvintele lipsă din text apăsând prima literă a fiecăruia, în ordine:',
            'points': 4
        }
    }

    // Simulate a user profile
    window.user_profile = {
        'nickname': 'Albert E.',
        'photo': './images/albert_e.png',
        'preferences': {
            'exercises_types': ['ID001', 'ID002']
        },
        'level': 1,
        'experience_points': 0
    }

    // Definition of nice messages listed on success
    window.success_messages = {
        'M001': 'Corect!',
        'M002': 'Bravo! Continuă!',
        'M003': 'Felicitări! Mergi mai departe!',
        'M004': 'Fantastic!',
        'M005': 'Super!',
        'M006': 'Perfect!',
        'M007': 'Foarte bine!',
        'M008': 'Minunat! Muncești din greu și înveți versete noi.',
        'M009': 'Se vede mult progres.',
        'M010': 'Devii din ce în ce mai bun.',
    }

    // Definition of messages to be listed on fail
    window.fail_messages = {
        'F001': 'Ops!',
        'F002': 'Of... Nu.',
        'F003': 'Mai încearcă.',
        'F004': 'Ai greșit...',
        'F005': 'Hmm. Nu chiar.',
        'F006': 'Of of of',
        'F007': 'Poți face întotdeauna mai mult decât ai crezut.',
        'F008': 'Mergi cu încredere mai departe.',
        'F009': 'Nimic nu este imposibil pentru cel care încearcă.',
        'F010': 'Nu-ți pierde entuziasmul.'
    }

    // Definition of levels
    window.levels = {
        1: {
            'exercises_types': ['ID001', 'ID004'],
            'success_messages': ['M001', 'M002', 'M006', 'M007'],
            'fail_messages': ['F001', 'F007', 'F008', 'F009', 'F010'],
            'text_max_length': 100
        },
        2: {
            'exercises_types': ['ID001', 'ID002', 'ID004'],
            'success_messages': ['M002', 'M003', 'M006', 'M007', 'M008'],
            'fail_messages': ['F002', 'F003', 'F007', 'F008', 'F009', 'F010'],
            'text_max_length': 150
        },
        3: {
            'exercises_types': ['ID001', 'ID002', 'ID004'],
            'success_messages': ['M003', 'M004', 'M006', 'M007', 'M008', 'M009', 'M010'],
            'fail_messages': ['F003', 'F007', 'F008', 'F009', 'F010'],
            'text_max_length': 200
        },
        4: {
            'exercises_types': ['ID001', 'ID002', 'ID004'],
            'success_messages': ['M004', 'M005', 'M006', 'M007', 'M008', 'M009', 'M010'],
            'fail_messages': ['F003', 'F004', 'F005', 'F007', 'F008', 'F009', 'F010'],
            'text_max_length': 300
        },
        5: {
            'exercises_types': ['ID001', 'ID002', 'ID004'],
            'success_messages': ['M005', 'M006', 'M007', 'M008', 'M009', 'M010'],
            'fail_messages': ['F006', 'F007', 'F008', 'F009', 'F010'],
            'text_max_length': 350
        },
        6: {
            'exercises_types': ['ID001', 'ID002', 'ID003', 'ID004'],
            'success_messages': ['M005', 'M006', 'M007', 'M008', 'M009', 'M010'],
            'fail_messages': ['F006', 'F007', 'F008', 'F009', 'F010'],
            'text_max_length': 400
        },
        7: {
            'exercises_types': ['ID001', 'ID002', 'ID003', 'ID004'],
            'success_messages': ['M005', 'M006', 'M007', 'M008', 'M009', 'M010'],
            'fail_messages': ['F006', 'F007', 'F008', 'F009', 'F010'],
            'text_max_length': 500
        },
        8: {
            'exercises_types': ['ID001', 'ID002', 'ID003', 'ID004'],
            'success_messages': ['M005', 'M006', 'M007', 'M008', 'M009', 'M010'],
            'fail_messages': ['F006', 'F007', 'F008', 'F009', 'F010'],
            'text_max_length': 600
        },
        9: {
            'exercises_types': ['ID001', 'ID002', 'ID003', 'ID004'],
            'success_messages': ['M005', 'M007', 'M008', 'M009', 'M010'],
            'fail_messages': ['F006', 'F007', 'F008', 'F009', 'F010'],
            'text_max_length': 1000
        },
        10: {
            'exercises_types': ['ID001', 'ID002', 'ID003', 'ID004'],
            'success_messages': ['M005', 'M007', 'M008', 'M009', 'M010'],
            'fail_messages': ['F006', 'F007', 'F008', 'F009', 'F010'],
            'text_max_length': 10000
        }
    }

    function clear_board() {
        // Clear the board. Usually when an exercise is done.
        $("div#exercise-board").html("");
    }

    function is_word(str) {
        // Check if a given string is a word
        return str.match("^[a-zA-ZășşțţâîĂȘȚÂÎ-]+$");
    }

    function ok_to_hide(word, i_tried) {
        // decide if the given word is ok to be a hidden one
        // If tried multiple times, it seems we must accept shorter words
        var min_word_length = 5;
        if (is_word(word)) {
            if (word.length > min_word_length - i_tried) {
                return true;
            }
        }

        return false;
    }

    function random_between(min, max) {
        // return a random number between min and max
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function more_and_more_probable_by_level_up(level) {
        // a way to generate difficulty for each level
        var min = 1;
        var number = 1;
        var max = level + 1;
        var res = random_between(min, max) === number;
        return !res;
    }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    function random_from_list(list) {
        // Return a random item from a list (array) of elements
        return list[Math.floor(Math.random() * list.length)];
    }

    function refresh_texts() {
        // Update experience points and current level
        $("li#info-points span").text(window.user_profile.experience_points);
        $("li#info-level span").text(window.user_profile.level);
        $("li#info-consecutive-successes span").text(window.consecutive_successes);
        $("li#info-current-text span").text(window.current_text);
    }

    function game_over() {
        // You won!
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yy = today.getFullYear().toString().substr(-2);

        finish_code = "VA" + yy + mm + dd;

        alertify.message("Ai terminat toate nivelurile. Felicitări!");
        $("button#some-experience").hide();
        $("button#fail").hide();
        $("div.row.row-footer").hide();
        $("div.row.row-board").html("<h2>Bravooooo!</h2><p>Ai trecut cu bine toate nivelurile. Sperăm că ai învățat multe versete.</p><p>Te invităm să vizitezi <a href='https://pentrucer.net/'>site-ul nostru</a> și să ne povestești experiența ta cu aplicația de memorat versete folosind <a href='https://pentrucer.net/contact/'>pagina de contact</a>.</p><p>Trimite-ne împreună cu feedback-ul tău codul <b>"
          + finish_code + "</b> și vei avea parte de o surpriză din partea echipei Pentru Cer.</p><p>Fii binecuvântat!</p>");
        $("div.row.row-board").append("<a href='' class='btn btn-primary'>Continuă să exersezi</a>");
    }

    function new_level() {
        // New level
        alertify.message("Nivel nou. Felicitări!");
    }

    function select_the_text_to_play(custom_max_length) {
        // We try to find a text ok for the current level
        var text_max_length = levels[window.user_profile.level].text_max_length;
        if (custom_max_length !== undefined) {
          text_max_length = custom_max_length;
        }
        var i_tried = 0;
        do {
            do {
                window.current_text = random_from_list(window.texts);
            } while (window.old_text == window.current_text);
            i_tried++;
        } while (
            window.current_text.length > text_max_length &&
            i_tried < 100
        );

        $("div.hint p.text-hint").text(window.current_text);
    }

    function split_current_text() {
        // Split the current text in parts: words and non-words, but keep their order
        return window.current_text.match(/[a-zășşțţâî-]+|[^a-zășşțţâî-]+/gi);
    }

    $.fn.blank_words = function () {
        function show_verse() {
            $("div#exercise-board").html("<div class='blank-words-test'><div class='blank-words-left'></div><div class='blank-words-right'></div></div>")
            $(".blank-words-right").html("");
            $(".blank-words-left").html("");
            var reg = /([^[]+(?=]))/g;

            var split_text = split_current_text();

            var i_tried = 0;
            var nr_choosen = 0;
            var text_definition = "";
            do {
                nr_choosen = 0;
                text_definition = "";
                split_text.forEach(element => {
                    if (ok_to_hide(element, i_tried) && more_and_more_probable_by_level_up(window.user_profile.level)) {
                        text_definition = text_definition + "[" + element + "]";
                        nr_choosen++;
                    } else {
                        text_definition += element;
                    }
                });
                i_tried++;
            } while (nr_choosen < 2); // Minimum 2 hidden words.

            var text_correct = text_definition.split("[").join("").split("]").join("");  // replace all [] with nothing
            var text_hidden = text_definition.match(reg);  // Extract the list of hidden words

            var $HTML_WIP = "<div class='text-with-blank'><p>***</p></div>";
            var $HTML_WIP2 = "<span class='blank'>__________</span>";
            var $text_def = text_definition.replace(/\[(.+?)\]/g, $HTML_WIP2);
            var $HTML_WIP3 = $HTML_WIP.split("***").join($text_def);
            var $HTML_to_display2 = $HTML_WIP3;

            shuffle(text_hidden);

            // this.append("<button class='dp4-done btn btn-primary'>Verifică</button>");
            // $("button.dp4-done").on("click", function () {

            var $HTML_to_display = $("div.text-with-blank");
            $HTML_to_display.find("span").replaceWith(function () { return "<div class='blank'>__________</div>"; });
            $(".blank-words-left").html($HTML_to_display2);

            $("button.dp4-done").remove();
            $("div.hint").prepend("<button class='dp4-done btn btn-primary'>Verifică</button>");
            $("button.dp4-done").hide();

            $("button.dp4-done").on("click", function () {
                var text_tried = $("div.blank-words-left p").text();
                if (text_tried == text_correct) {
                    $(".blank-words-status").html("<p class='status-succes-text'><b> <i class='fa fa-check'></i></b></p>");
                    //swal("Felicitări! ", "Ai învățat un verset!", "success");
                    $("button.dp4-done").remove();
                    $(document).trigger("exercise_success_event", ["bim", "baz"]);
                    //$(".word").css("pointer-events", "none");
                } else {
                    if (alerted_fail == false) {
                        //swal("Ai greșit!", "Încearcă din nou.", "error");
                        $("button.dp4-done").hide();
                        $(document).trigger("exercise_fail_event", ["FAIL"]);
                    }

                    setTimeout(function () {
                        $(".word").appendTo('.blank-words-right');
                        $(".word").removeClass('dropped');

                        $(".blank").each(function () {
                            if ($(this).html() == "") {
                                $(this).text("__________");
                                $(this).droppable('enable');
                            }
                        });
                    }, 1000);
                }
            });

            for (var index in text_hidden) {
                var $new_word = $("<div>").addClass("word").html(text_hidden[index]);
                $(".blank-words-right").append($new_word);
            }

            var number_words_to_drop = 0;
            var alerted_fail = false;

            $(".word").draggable({ revert: true, cursor: "pointer", containment: ".blank-words-test" });
            $(".blank-words-right").droppable({
                drop: function (ev, ui) {
                    $(ui.draggable).detach().css({ top: 0, left: 0 }).appendTo(this);
                    $(ui.draggable).removeClass('dropped');

                    $(".blank").each(function () {
                        if ($(this).html() == "") {
                            $(this).text("__________");
                            $(this).droppable('enable');
                        }
                    });
                }
            });

            $(".blank").droppable({
                drop: function (ev, ui) {
                    $(this).text("");

                    $(ui.draggable).detach().css({ top: 0, left: 0 }).appendTo(this);
                    $(ui.draggable).addClass('dropped');

                    number_words_to_drop = $(".blank-words-right div.word:not(.dropped)").length;

                    $(this).droppable('disable');

                    $(".blank").each(function () {
                        if ($(this).html() == "") {
                            $(this).text("__________");
                            $(this).droppable('enable');
                        }
                    });

                    if (number_words_to_drop == 0) {
                        $("button.dp4-done").show();
                    } else {
                        $("button.dp4-done").hide();
                    }
                }
            });
        }

        show_verse(window.current_verse);
    };

    $.fn.fill_reference = function () {
        // Fill the reference for a given text
        this.empty();

        var wholeText = window.current_text;
        var verse = "";
        var reference = "";
        var lIndexOfParenthesis = wholeText.lastIndexOf("(");

        if (lIndexOfParenthesis > 0) {
            verse = wholeText.substring(0, lIndexOfParenthesis);
            reference = wholeText.substring(lIndexOfParenthesis).replace("(", "").replace(")", "");
        };

        var text = reference;
        var verse_number = text.split(":")[1];
        var first_part = text.split(":")[0];
        var parts = first_part.split(" ");
        var chapter = parts[parts.length - 1];
        var book = first_part.split(" " + chapter)[0];
        var multiple_verses = verse_number.indexOf("-") !== -1;
        var is_special_verse = verse_number.indexOf("p") !== -1;

        this.append('<p class="dp4-displayed-verse">' + verse + "</p>");
        $("div.app-templates div.dp4-template").clone().removeClass("app-hidden").appendTo("div#exercise-board");

        function we_should_list_this_book(book, correct_book) {
            if (book == correct_book) {
                return true;
            } else {
                if(more_and_more_probable_by_level_up(window.user_profile.level) &&
                   more_and_more_probable_by_level_up(window.user_profile.level) &&
                   more_and_more_probable_by_level_up(window.user_profile.level) &&
                   more_and_more_probable_by_level_up(window.user_profile.level)) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        $('div#exercise-board select.dp4-carte').append($('<option>', {
            value: "Alege cartea",
            text: "Alege cartea",
            disabled: true,
            selected: true
        }));

        $.each(window.all_books, function (i, item) {
            if (we_should_list_this_book(item, book)) {
                $('div#exercise-board select.dp4-carte').append($('<option>', {
                    value: item,
                    text: item
                }));
            }
        });

        if (is_special_verse || multiple_verses || window.user_profile.level <= 7) {
            $("input.dp4-versete").val(verse_number);
        }

        if (window.user_profile.level <= 5) {
            $("input.dp4-capitol").val(chapter);
        }
        this.append("<button class='dp4-done btn btn-primary'>Verifică</button>");

        $("button.dp4-done").on("click", function () {
            var userReference = $("div#exercise-board .dp4-carte").val() + " " +
                $("div#exercise-board .dp4-capitol").val() + ":" +
                $("div#exercise-board .dp4-versete").val();
            if (userReference.toLowerCase() == reference.toLowerCase()) {
                $("button.dp4-done").hide();
                $(document).trigger("exercise_success_event", ["SUCCESS"]);
            } else {
                $(document).trigger("exercise_fail_event", ["FAIL"]);
            }
        });
    };

    $.fn.fill_text = function () {
        // Fill the text for a given reference
        this.empty();

        var wholeText = window.current_text;
        var verse = "";
        var reference = "";
        var lIndexOfParenthesis = wholeText.lastIndexOf("(");

        if (lIndexOfParenthesis > 0) {
            verse = wholeText.substring(0, lIndexOfParenthesis - 1);
            reference = wholeText.substring(lIndexOfParenthesis).replace("(", "").replace(")", "");
        };

        $("div#exercise-board").append("<h3>" + reference + "</h3>");
        $("div#exercise-board").append("<textarea class='form-control' id='verse-text' rows='3'></textarea>");

        this.append("<button class='check-done btn btn-primary'>Verifică</button>");

        $("button.check-done").on("click", function () {
            var user_text = $("textarea#verse-text").val();

            var aa = user_text.toLowerCase();
            var bb = verse.toLowerCase();

            var xx = new Levenshtein(aa, bb);

            if (xx < 20) {
                $("button.check-done").hide();
                $(document).trigger("exercise_success_event", ["SUCCESS"]);
            } else {
                $(document).trigger("exercise_fail_event", ["FAIL"]);
            }
        });
    };


    $.fn.fill_by_first_letter = function () {
        // Fill the text by pressing first letter of each word, in correct order
        this.empty();

        var split_text = split_current_text();

        var text_definition = "";
        var hidden_words = [];
        var hidden_word_placeholder = "_____";

        var i_tried = 0;
        do {
            text_definition = "";
            hidden_words = [];
            split_text.forEach(element => {
                if (ok_to_hide(element, i_tried) && more_and_more_probable_by_level_up(window.user_profile.level)) {

                    ok_to_add = true;
                    hidden_words.forEach(a_word => {
                        if (a_word[0] == element[0]) {
                            ok_to_add = false;
                        }
                    });

                    if (ok_to_add) {
                        text_definition = text_definition + hidden_word_placeholder;
                        hidden_words.push(element);
                    } else {
                        text_definition += element;
                    }
                } else {
                    text_definition += element;
                }
            });
            i_tried++;
        } while (hidden_words.length < 2);  // Minimum 2 hidden words

        $("div#exercise-board").append("<p class='hidden-text'>" + text_definition + "</p>");

        var first_letters = hidden_words.slice();  // Yeah. Else both arrays are changed on shuffle
        first_letters = shuffle(first_letters);

        first_letters.forEach(function (item) {
            $("div#exercise-board").append("<button class='press-letter btn btn-primary'>" + item[0] + "</button> ");
        });

        $("button.press-letter").on("click", function () {
            var pressed_letter = $(this).text();
            if (pressed_letter == hidden_words[0][0]) {
                $(this).hide();
                var current_hidden_text = $("p.hidden-text").html();
                var replaced_first = current_hidden_text.replace(hidden_word_placeholder, "<b>" + hidden_words[0] + "</b>");
                $("p.hidden-text").html(replaced_first);
                hidden_words.shift();

                window.consecutive_fails = 0;  // Reset fails. The exercise will skip only with 3 consecutive wrong letters.

                if (hidden_words.length == 0) {
                    $(document).trigger("exercise_success_event", ["SUCCESS"]);
                }
            } else {
                $(document).trigger("exercise_fail_event", ["FAIL"]);
            }
        });
    };

    function new_exercise() {
        // Start a new exercise
        $("div.hint p").hide();
        $("div.hint button").show();
        window.hint_used = false;
        $("button.dp4-done").remove();

        if (window.user_profile.level === 0) {
            return;  // TODO fix me
        }

        window.consecutive_fails = 0;

        var possible_exercises = levels[window.user_profile.level].exercises_types;
        var choosen_exercise_id = random_from_list(possible_exercises);

        var exercise = exercises_types[choosen_exercise_id];

        window.current_exercise_type = choosen_exercise_id;

        $("div#debug-info li.exercise-id span").text(choosen_exercise_id);
        $("div#debug-info li.exercise-points span").text(exercise.points);
        $("div#exercise-info h3.exercise-title").text(exercise.title);
        $("div#exercise-info p.exercise-description").text(exercise.description);

        var plugin_name = exercise.plugin_name;

        if (choosen_exercise_id == 'ID003') {
          select_the_text_to_play(80);
        } else {
          select_the_text_to_play();
        }

        $("div#exercise-board")[plugin_name]();

    }

    function update_progress() {
        // Update the experience points, check levels
        var old_points = window.user_profile.experience_points;

        var points_for_this = exercises_types[window.current_exercise_type].points;
        if (window.hint_used) {
            points_for_this = 0;
        }

        window.user_profile.experience_points += points_for_this;
        window.user_profile.experience_points += window.bonus_points;
        window.bonus_points = 0;

        window.consecutive_successes += 1;

        if (window.hint_used) {
            window.consecutive_successes = 0;
        }

        if (window.consecutive_successes % 5 == 0 && window.consecutive_successes > 0) {
            alertify.message("Superb! " + window.consecutive_successes + " exerciții consecutive rezolvate corect din prima.");
            window.user_profile.experience_points += window.consecutive_successes;
        }

        new_exercise();

        if (window.user_profile.experience_points >= window.number_of_levels * window.points_per_level) {
            game_over();
        } else {
            var level_start_at = window.user_profile.level * window.points_per_level;
            if (old_points < level_start_at && window.user_profile.experience_points >= level_start_at) {
                window.user_profile.level += 1;
                new_level();
            }
        }
        save_to_cookies();
        refresh_texts();
    }

    function fail() {
        // When there is no progress
        window.consecutive_fails += 1;
        var possible_messages = levels[window.user_profile.level].fail_messages;
        var choosen_msg_id = random_from_list(possible_messages);
        var message = fail_messages[choosen_msg_id];
        window.consecutive_successes = 0;
        refresh_texts();
        alertify.error(message);

        if (window.consecutive_fails >= 3) {
            $("div.hint p.text-hint").show();
            $("div.hint button").hide();
            window.hint_used = true;
            $("div.next-exercise button").show();
        }
    }

    function start_game() {
        // Init game starting with user's current experience points
        // update_progress(); only for logged in case

        new_exercise();
        refresh_texts();
    }

    function load_profile() {
        // Load logged in profile
        window.experience_points = user_profile.experience_points;
        window.current_level = user_profile.level;

        var nickname = user_profile.nickname;
        var photo = user_profile.photo;

        $("#info-nickname span").text(nickname);
    }
    function get_expire_date() {
        var cookie_expire = new Date();
        cookie_expire.setTime(cookie_expire.getTime() + 180 * 24 * 60 * 60 * 1000);
        return ";expires=" + cookie_expire.toUTCString();
    }
    function get_or_set_cookie(key, currentValue) {
        var result = currentValue;
        var cookieVal = document.cookie.split('; ').find(row => row.startsWith(key));
        if (!cookieVal) {
            document.cookie = key + "=" + currentValue + get_expire_date();
        } else {
            result = cookieVal.replace(key + "=", "");
        }
        return result;
    }

    function save_to_cookies() {
        document.cookie = "user_profile_level=" + window.user_profile.level + get_expire_date();
        document.cookie = "user_profile_experience_points=" + window.user_profile.experience_points +  get_expire_date();
    }

    function show_user_profile_popup() {
        if($(".dp4-nickname").val().length > 0) {
            $(".dp4-profile-dialog-header span").text("");
            $(".dp4-confirm-profile-dialog span").text("Salvează");
        }else{
            $(".dp4-profile-dialog-header span").text("Bun venit! Pentru a începe, completează-ți numele.");
            $(".dp4-confirm-profile-dialog span").text("Start");
        }
        $(".user-profile-dialog").removeClass("app-hidden");
    }

    if (!document.cookie.split('; ').find(row => row.startsWith('user_profile_nickname'))) {
        show_user_profile_popup();
    } else {
        window.is_logged_in = true;
        window.user_profile.nickname = document.cookie.split('; ').find(row => row.startsWith('user_profile_nickname')).replace("user_profile_nickname=", "");
        window.user_profile.level = parseInt(get_or_set_cookie("user_profile_level", window.user_profile.level));
        window.user_profile.experience_points = parseInt(get_or_set_cookie("user_profile_experience_points", window.user_profile.experience_points));
    }

    // OK, let's start.
    if (window.is_logged_in) {
        load_profile();
    }

    $("#info-nickname span").on("click", function () {
        $(".dp4-nickname").val(window.user_profile.nickname);
        show_user_profile_popup();
    });

    $('input.dp4-nickname').keyup(function(){
      $('button.dp4-confirm-profile-dialog').prop('disabled', this.value == "" ? true : false);
    });

    $(".user-profile-dialog").click(function(event) {
        if ( event.target !== event.currentTarget ){
            return;
        }
        $(".user-profile-dialog").addClass("app-hidden");
    });
    $(".dp4-confirm-profile-dialog").on("click", function () {
        $(".user-profile-dialog").addClass("app-hidden");
        window.user_profile.nickname = $(".dp4-nickname").val();
        window.is_logged_in = true;
        load_profile();
        document.cookie = "user_profile_nickname=" + window.user_profile.nickname +  get_expire_date();
    });

    $(document).on("exercise_success_event", {
        foo: "bar"
    }, function (event, arg1, arg2) {
        window.old_text = window.current_text;

        var possible_messages = levels[window.user_profile.level].success_messages;
        var choosen_msg_id = random_from_list(possible_messages);
        var message = success_messages[choosen_msg_id];
        alertify.success(message);

        $("div.next-exercise button").show();
        $("div.hint button").hide();
    });

    $("div.next-exercise button").on("click", function () {
        update_progress();
        $("div.next-exercise button").hide();
    });

    $("div.hint button").on("click", function () {
        $("div.hint button").hide();
        $("div.hint p.text-hint").show();
        window.hint_used = true;
    });

    $(document).on("exercise_fail_event", {
        foo: "bar"
    }, function (event, arg1, arg2) {
        fail();
    });

    alertify.set('notifier', 'position', 'top-right');

    $("li#info-reset span").on("click", function() {
        if (confirm('Tu chiar vrei să începi de la nivelul 1 din nou? Pierzi tot progresul.')) {
            window.user_profile.level = 1;
            window.current_level = 1;
            window.user_profile.experience_points = 0;
            save_to_cookies();
            refresh_texts();
        } else {
            alert('Te-ai răzgândit. Poți continua de unde ai rămas.');
        }
    });

    start_game();

    // These are for testing:

    // In case of success:
    $("button#some-experience").on("click", update_progress);

    $("button#some-experience-bonus").on("click", function () {
        window.bonus_points = 20;
        update_progress();
    });

    // In case of fail:
    $("button#fail").on("click", fail);
});
