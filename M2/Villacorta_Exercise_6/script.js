// Import jQuery (assuming you are using a CDN)
// <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

$(document).ready(() => {
    const riddleText = $("#riddle-text")
    const answerText = $("#answer")
    const generateBtn = $("#generate-btn")
    const showAnswerBtn = $("#show-answer-btn")
  
    function getRiddle() {
      $.ajax({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/riddles",
        headers: { "X-Api-Key": "hdQh1bJl/JYasEq+zlzv9w==bRAOjJlboTVxXHdI" },
        contentType: "application/json",
        success: (result) => {
          if (result && result.length > 0) {
            const riddle = result[0]
            riddleText.text(riddle.question)
            answerText.text(riddle.answer)
            showAnswerBtn.removeClass("hidden")
            answerText.addClass("hidden")
  
            riddleText.removeClass("fade-in")
            void riddleText[0].offsetWidth // Trigger reflow
            riddleText.addClass("fade-in")
          }
        },
        error: (jqXHR) => {
          console.error("Error: ", jqXHR.responseText)
          riddleText.text("Oops! Failed to fetch a riddle. Please try again.")
        },
      })
    }
  
    generateBtn.click(() => {
      getRiddle()
    })
  
    showAnswerBtn.click(function () {
      answerText.toggleClass("hidden")
      $(this).text(answerText.hasClass("hidden") ? "Show Answer" : "Hide Answer")
  
      if (!answerText.hasClass("hidden")) {
        answerText.removeClass("fade-in")
        void answerText[0].offsetWidth // Trigger reflow
        answerText.addClass("fade-in")
      }
    })
  
    // Load initial riddle
    getRiddle()
  })
  
  