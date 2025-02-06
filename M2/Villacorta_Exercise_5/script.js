document.addEventListener("DOMContentLoaded", () => {
    const quoteText = document.getElementById("quote-text")
    const quoteAuthor = document.getElementById("quote-author")
    const newQuoteBtn = document.getElementById("new-quote-btn")
    const copyBtn = document.getElementById("copy-btn")
    const quoteBox = document.querySelector(".quote-box")
  
    let currentQuote = null
  
    async function fetchQuote() {
      setLoading(true)
      try {
        const response = await fetch("https://dummyjson.com/quotes/random")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        displayQuote(data)
      } catch (error) {
        console.error("Error fetching quote:", error)
        displayError()
      } finally {
        setLoading(false)
      }
    }
  
    function displayQuote(quote) {
      currentQuote = quote
      quoteBox.classList.remove("fade-in")
      void quoteBox.offsetWidth // Trigger reflow
      quoteBox.classList.add("fade-in")
  
      quoteText.textContent = `"${quote.quote}"`
      quoteAuthor.textContent = `- ${quote.author}`
    }
  
    function displayError() {
      quoteText.textContent = "Failed to load quote. Please try again."
      quoteAuthor.textContent = ""
    }
  
    function setLoading(isLoading) {
      newQuoteBtn.disabled = isLoading
      copyBtn.disabled = isLoading
      if (isLoading) {
        quoteText.textContent = "Loading inspirational quote..."
        quoteAuthor.textContent = ""
        quoteBox.style.opacity = "0.7"
      } else {
        quoteBox.style.opacity = "1"
      }
    }
  
    function copyToClipboard() {
      if (currentQuote) {
        navigator.clipboard.writeText(`"${currentQuote.quote}" - ${currentQuote.author}`)
        copyBtn.querySelector(".btn-text").textContent = "Copied!"
        setTimeout(() => {
          copyBtn.querySelector(".btn-text").textContent = "Copy"
        }, 2000)
      }
    }
  
    newQuoteBtn.addEventListener("click", fetchQuote)
    copyBtn.addEventListener("click", copyToClipboard)
  
    // Fetch a quote when the page loads
    fetchQuote()
  })
  
  