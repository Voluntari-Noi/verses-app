  $("document").ready(function () {
    // Init game
    window.current_level = 1;
    window.experience_points = 0;
    window.number_of_levels = 5;
    window.points_per_level = 10;
    window.current_exercise_type = 'ID001';
    window.is_logged_in = false;
    window.consecutive_successes = 0;
    window.all_books = ['Geneza', 'Exod', 'Levitic', 'Numeri', 'Deuteronom', 'Iosua', 'Judecători', 'Rut', '1 Samuel', '2 Samuel', '1 Împăraţi', '2 Împăraţi', '1 Cronici', '2 Cronici', 'Ezra', 'Neemia', 'Estera', 'Iov', 'Psalmi', 'Proverbe', 'Eclesiastul', 'Cântarea cântărilor', 'Isaia', 'Ieremia', 'Plângerile lui Ieremia', 'Ezechiel', 'Daniel', 'Osea', 'Ioel', 'Amos', 'Obadia', 'Iona', 'Mica', 'Naum', 'Habacuc', 'Țefania', 'Hagai', 'Zaharia', 'Maleahi', 'Matei', 'Marcu', 'Luca', 'Ioan', 'Faptele Apostolilor', 'Romani', '1 Corinteni', '2 Corinteni', 'Galateni', 'Efeseni', 'Filipeni', 'Coloseni', '1 Tesaloniceni', '2 Tesaloniceni', '1 Timotei', '2 Timotei', 'Tit', 'Filimon', 'Evrei', 'Iacov', '1 Petru', '2 Petru', '1 Ioan', '2 Ioan', '3 Ioan', 'Iuda', 'Apocalipsa'];
    window.texts = [
      "Cuvântul Tău este o candelă pentru picioarele mele și o lumină pe cărarea mea. (Psalmii 119:105)",
      "Să ascultăm, dar, încheierea tuturor învățăturilor: Teme-te de Dumnezeu și păzește poruncile Lui. Aceasta este datoria oricărui om. (Eclesiast 12:13)",
      "Omul socotește că toate căile lui sunt fără prihană, dar Cel ce cercetează inimile este Domnul. (Proverbe 21:2)",
      "Puii de leu duc lipsă și li-e foame, dar cei ce caută pe Domnul nu duc lipsă de niciun bine. (Psalmii 34:10)",
      "Domnul va sfârși ce a început pentru mine. Doamne, bunătatea Ta ține în veci: nu părăsi lucrările mâinilor Tale. (Psalmii 138:8)",
      "Împrietenește-te dar cu Dumnezeu și vei avea pace; te vei bucura astfel iarăși de fericire. (Iov 22:21)",
      "Deci ce vom zice noi în fața tuturor acestor lucruri? Dacă Dumnezeu este pentru noi, cine va fi împotriva noastră? (Romani 8:31)",
      "Căci suntem în clipa când judecata stă să înceapă de la Casa lui Dumnezeu. Și, dacă începe cu noi, care va fi sfârșitul celor ce nu ascultă de Evanghelia lui Dumnezeu? (1 Petru 4:17)",
      "El zicea cu glas tare: „Temeți-vă de Dumnezeu și dați-I slavă, căci a venit ceasul judecății Lui; și închinați-vă Celui ce a făcut cerul și pământul, marea și izvoarele apelor!” (Apocalipsa 14:7)",
      "Apoi a urmat un alt înger, al doilea, și a zis: „A căzut, a căzut Babilonul, cetatea cea mare, care a adăpat toate neamurile din vinul mâniei curviei ei!” (Apocalipsa 14:8)",
      "Apoi a urmat un alt înger, al treilea, și a zis cu glas tare: „Dacă se închină cineva fiarei și icoanei ei și primește semnul ei pe frunte sau pe mână, va bea și el din vinul mâniei lui Dumnezeu, turnat neamestecat în paharul mâniei Lui; și va fi chinuit în foc și în pucioasă, înaintea sfinților îngeri și înaintea Mielului. Și fumul chinului lor se suie în sus în vecii vecilor. Și nici ziua, nici noaptea n-au odihnă cei ce se închină fiarei și icoanei ei și oricine primește semnul numelui ei! (Apocalipsa 14:9-11)",
      "Aici este răbdarea sfinților, care păzesc poruncile lui Dumnezeu și credința lui Isus.” (Apocalipsa 14:12)"
    ];

    window.current_text = "aaa";

    // Definition of exercises types
    window.exercises_types = {
      'ID001': {
        'plugin_name': 'blank_words',
        'title': 'Cuvinte lipsă',
        'description': 'Mută cuvintele la locul potrivit.',
        'points': 1,
      },
      'ID002': {
        'plugin_name': 'demo_plugin2',
        'title': 'Toate cuvintele',
        'description': 'Aranjează cuvintele în ordinea potrivită, descoperă versetul.',
        'points': 2,
      },
      'ID003': {
        'plugin_name': 'demo_plugin3',
        'title': 'Puzzle',
        'description': 'Rezolvă puzzle-ul, învață versetul.',
        'points': 3,
      },
      'ID004': {
        'plugin_name': 'fill_reference',
        'title': 'Referinta lipsa',
        'description': 'Introdu referinta pentru acest verset.',
        'points': 3,
      },
    }

    // Simulate a user profile
    window.user_profile = {
      'nickname': 'Albert E.',
      'photo': './images/albert_e.png',
      'preferences': {
        'exercises_types': ['ID001', 'ID002']
      },
      'level': 2,
      'experience_points': 21
    }

    // Definition of nice messages listed on success
    window.success_messages = {
      'M001': 'Bravo!',
      'M002': 'Uaaaa!',
      'M003': 'Super. Ai rezolvat corect!',
      'M004': 'Se vede mult progres. Frumos!',
      'M005': 'Sunt mândru de tine. Felicitări!',
      'M006': 'Yeeey! Foarte foarte tare!'
    }

    // Definition of messages to be listed on fail
    window.fail_messages = {
      'F001': 'Ops!',
      'F002': 'Of... Nu.',
      'F003': 'Mai încearcă.',
      'F004': 'Ai greșit...',
      'F005': 'Hmm. Nu chiar.',
      'F006': 'Of of of'
    }

    // Definition of levels
    window.levels = {
      1: {
        'exercises_types': ['ID001'],
        'success_messages': ['M001', 'M002'],
        'fail_messages': ['F001']
      },
      2: {
        'exercises_types': ['ID001', 'ID002', 'ID004'],
        'success_messages': ['M002', 'M003'],
        'fail_messages': ['F002', 'F003']
      },
      3: {
        'exercises_types': ['ID001', 'ID002', 'ID003', 'ID004'],
        'success_messages': ['M003', 'M004'],
        'fail_messages': ['F003']
      },
      4: {
        'exercises_types': ['ID003', 'ID004'],
        'success_messages': ['M004', 'M005'],
        'fail_messages': ['F003', 'F004', 'F005']
      },
      5: {
        'exercises_types': ['ID001', 'ID002', 'ID003'],
        'success_messages': ['M005', 'M006'],
        'fail_messages': ['F006']
      },
    }

    function clear_board() {
      // Clear the board. Usually when an exercise is done.
      $("div#exercise-board").html("");
    }

    function only_letters(str) {
      // Check if a given string have only letters
      return str.match("^[a-zA-ZășțâîĂȘȚÂÎ]+$");
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
      $("p#info-points span").text(window.experience_points);
      $("p#info-level span").text(window.current_level);
      $("p#info-consecutive-successes span").text(window.consecutive_successes);
    }

    function game_over() {
      // You won!
      alert("You won the game. Congrats!");
      $("button#some-experience").hide();
      $("button#fail").hide();
    }

    function new_level() {
      // New level
      alert("New level. Yey!");
    }

    $.fn.blank_words = function () {
      function show_verse() {
        $("div#exercise-board").html("<div class='blank-words-test'><div class='blank-words-left'></div><div class='blank-words-right'></div></div>")
        $(".blank-words-right").html("");
        $(".blank-words-left").html("");
        var reg = /([^[]+(?=]))/g;
        var split_text = window.current_text.split(/([_\W])/);
        var text_definition = "";
        split_text.forEach(element => {
          if(only_letters(element)) {
            text_definition = text_definition + "[" + element + "]";
          } else {
            text_definition += element;
          }
        });
        text_definition = text_definition.split("][").join("");  // fix wrong split
        text_definition = text_definition.split("]-[").join("-");  // fix wrong split

        console.log(text_definition);
        var text_correct = text_definition.split("[").join("").split("]").join("");  // replace all [] with nothing
        var text_hidden = text_definition.match(reg);  // Extract the list of hidden words

        var $HTML_WIP = "<div class='text-with-blank'><p>***</p></div>";
        var $HTML_WIP2 = "<span class='blank'>__________</span>";
        var $text_def = text_definition.replace(/\[(.+?)\]/g, $HTML_WIP2);
        var $HTML_WIP3 = $HTML_WIP.split("***").join($text_def);
        var $HTML_to_display2 = $HTML_WIP3;

        shuffle(text_hidden);

        var $HTML_to_display = $("div.text-with-blank");
        $HTML_to_display.find("span").replaceWith(function () { return "<div class='blank'>__________</div>"; });
        $(".blank-words-left").html($HTML_to_display2);

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
              var text_tried = $("div.blank-words-left p").text();
              console.log(text_definition);
              if (text_tried == text_correct) {
                $(".blank-words-status").html("<p class='status-succes-text'><b> <i class='fa fa-check'></i></b></p>");
                <!-- swal("Felicitări! ", "Ai învățat un verset!", "success"); -->
                alert("Corect");
                clear_board();
                $(document).trigger("exercise_success_event", ["bim", "baz"]);  // TODO: status? (fail/success) extra points?
                // $(".word").css("pointer-events", "none");
              } else {
                if (alerted_fail == false) {
                  <!-- swal("Ai greșit!", "Încearcă din nou.", "error"); -->
                  alert("Gresit");
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
            }
          }
        });
      }

      show_verse(window.current_verse);
    };

    $.fn.demo_plugin1 = function () {
      this.text("DEMO PLUGIN 1 LOADED:" + window.current_text);
      this.append("<button class='done'>Done</button>");
      $("button.done").on("click", function () {
        $(document).trigger("exercise_success_event", ["bim", "baz"]);  // TODO: status? (fail/success) extra points?
      });
    };

    $.fn.demo_plugin2 = function () {
      this.text("DEMO PLUGIN 2 LOADED:" + window.current_text);
      this.append("<button class='done'>Done</button>");
      $("button.done").on("click", function () {
        $(document).trigger("exercise_success_event", ["bim", "baz"]);  // TODO: status? (fail/success) extra points?
      });
    };

    $.fn.demo_plugin3 = function () {
      this.text("DEMO PLUGIN 3 LOADED:" + window.current_text);
      this.append("<button class='done'>Done</button>");
      $("button.done").on("click", function () {
        $(document).trigger("exercise_success_event", ["bim", "baz"]);  // TODO: status? (fail/success) extra points?
      });
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
      this.append('<p style="background-color:white;padding:15px;" class="dp4_displayed_verse">' + window.current_text + "</p>");
      var selectHtml = '<select class="dp4_carte">';
      window.all_books.forEach(element => {
        selectHtml += '<option value="' + element + '">' + element + '</option>';
      });
      this.append(selectHtml + "</select>");
      this.append(" ");
      this.append('<input class="dp4_capitol" style="width:30px" />');
      this.append(' : ');
      this.append('<input class="dp4_versete"  style="width:35px"/><br/><br/>');
      this.append("<button class='dp4_done'>Done</button>");
      $("button.dp4_done").on("click", function () {
        var userReference = $(".dp4_carte").val() + " " + $(".dp4_capitol").val() + ":" + $(".dp4_versete").val();
        if (userReference.toLowerCase() == reference.toLowerCase()) {
          $(document).trigger("exercise_success_event", ["SUCCESS"]);  // TODO: status? (fail/success) extra points?
        } else {
          $(document).trigger("exercise_success_event", ["FAIL"]);
        }
      });
    };

    function new_exercise() {
      // Start a new exercise
      if (window.current_level === 0) {
        return;  // TODO fix me
      }

      console.log("New exercise:");
      var possible_exercises = levels[window.current_level].exercises_types;
      var choosen_exercise_id = random_from_list(possible_exercises);
      console.log(possible_exercises);
      console.log(choosen_exercise_id);

      var exercise = exercises_types[choosen_exercise_id];

      window.current_exercise_type = choosen_exercise_id;

      $("div#exercise-info p.exercise-id").text(choosen_exercise_id);
      $("div#exercise-info p.exercise-title").text(exercise.title);
      $("div#exercise-info p.exercise-description").text(exercise.description);
      $("div#exercise-info p.exercise-points span").text(exercise.points);

      var plugin_name = exercise.plugin_name;
      console.log("Plugin: " + plugin_name);

      // cerem plugin-ul corespunzator cu exercitiul
      // window.current_verse
      // TODO implement plugin ID000 - template
      window.current_text = random_from_list(window.texts);
      $("div#exercise-board")[plugin_name]();

      console.log(window.current_exercise_type);
    }

    function update_progress() {
      // Update the experience points, check levels
      var old_points = window.experience_points;

      var points_for_this = exercises_types[window.current_exercise_type].points;
      window.experience_points += points_for_this;

      console.log("Ai câștigat " + points_for_this + " punct(e)!");

      var possible_messages = levels[window.current_level].success_messages;
      var choosen_msg_id = random_from_list(possible_messages);
      var message = success_messages[choosen_msg_id];
      alert(message);
      window.consecutive_successes += 1;

      if (window.consecutive_successes % 5 == 0) {
        alert("Superb! " + window.consecutive_successes + " exerciții consecutive rezolvate corect din prima.");
      }

      new_exercise();

      if (window.experience_points >= window.number_of_levels * window.points_per_level) {
        game_over();
      } else {
        var level_start_at = window.current_level * window.points_per_level;
        if (experience_points > level_start_at) {
          // fix possible issue on loading profile:
          level_start_at = (window.current_level + 1) * window.points_per_level;
        }

        console.log("Old:" + old_points + " Level start at: " + level_start_at + " Experience points: " + window.experience_points);
        if (old_points < level_start_at && window.experience_points >= level_start_at) {
          window.current_level += 1;
          new_level();
        }
      }

      refresh_texts();
    }

    function fail() {
      // When there is no progress
      var possible_messages = levels[window.current_level].fail_messages;
      var choosen_msg_id = random_from_list(possible_messages);
      var message = fail_messages[choosen_msg_id];
      window.consecutive_successes = 0;
      refresh_texts();
      alert(message);
    }

    function start_game() {
      // Init game starting with user's current experience points
      update_progress();

      new_exercise();
    }

    function load_profile() {
      // Load logged in profile
      window.experience_points = user_profile.experience_points;
      window.current_level = user_profile.level;

      var nickname = user_profile.nickname;
      var photo = user_profile.photo;

      $("p#info-nickname span").text(nickname);
    }

    // OK, let's start.
    if (window.is_logged_in) {
      load_profile();
    }

    $(document).on("exercise_success_event", {
      foo: "bar"
    }, function (event, arg1, arg2) {
      console.log(event.data.foo); // "bar"
      console.log(arg1);           // "bim"
      console.log(arg2);           // "baz"
      console.log("YEEEY");
      update_progress();
    });

    start_game();

    // These are for testing:

    // In case of success:
    $("button#some-experience").on("click", update_progress);

    // In case of fail:
    $("button#fail").on("click", fail);
  });
