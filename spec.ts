import {browser, element, By, $$, $, by} from 'protractor'

//HOMEWORK
//Movie cards testing
describe('Movie card ', async function(){

  it('should have name', async function(){
    await browser.get('/')
    let movieNameCard = $$('movie-card').get(0).$('.text-ellipsis a')
    expect(await movieNameCard.getAttribute('title')).toContain('Dilwale Dulhania Le Jayenge')
  })

  it('should have "raiting" pointer', async function(){
    await browser.get('/')
    let movieRating = $$('movie-card').get(0).$('small')
    console.log(await movieRating.getText())
    expect(await movieRating.isDisplayed()).toBe(true)
  })

  it('should open appropriate "movie details" page, after click on "name" field', async function(){
    await browser.get('/')
    let movieCardLink = $$('movie-card').get(0).$('.text-ellipsis a')
    let movieNameCardText = await movieCardLink.getText()
    await movieCardLink.click()
    await browser.sleep(1000) // doesnt find element without sleep
    let movieNameDetail = $('.row >div:nth-child(2) > h2')
    expect(await movieNameDetail.getText()).toContain(movieNameCardText)
  })
})

// Navigation
describe('Navigation ',async function() {

  it('should open "Upcoming movies" section', async function() {
    await browser.get('/')
    let upcomingMobiesButton = $('[href = "/upcoming"]')
    await upcomingMobiesButton.click()
    await browser.sleep(1000)
    let upcomingMoviesHeader = await $('.orange-text').getText()
    expect(upcomingMoviesHeader).toBe("Up Coming Movies")
    expect(await  browser.getCurrentUrl()).toContain('/upcoming')
  })

  it('should open "Popular Series" section', async function(){
    await browser.get('/')
    let popularSeriesButton = $('[href = "/popular/series"]')
    await popularSeriesButton.click()
    await browser.sleep(1000)
    let popularSeriesButtonText = await popularSeriesButton.getText()
    let popularSeriesHeader = await $('.orange-text').getText()
    expect(popularSeriesHeader).toBe(popularSeriesButtonText) //page Header should be equal to button text
  })

  it('should open "Action" category', async function(){
    await browser.get('/')
    let category = element(By.cssContainingText('.list-group-item', 'Action'))
    await category.click()
    await browser.sleep(1000)
    let pageHeader = await $('.orange-text').getText()
    expect(await category.getText()).toBe(pageHeader) //page header should be equal to Category name

    console.log(await category.getText())
    console.log(pageHeader)
  })
})


// Search
describe('Search ', async function(){

  it('by exisiting name, should show first movie with complete name match', async function(){
    let searchFilmName = 'Fight Club'
    let searchField = $$('[name="searchStr"]')
    let searchButton = $('.input-group-btn')
    let firstMovieName = $$('movie-card').get(0).$('[title]')
    await browser.get('/')

    await searchField.sendKeys(searchFilmName)
    await searchButton.click()
    await browser.sleep(3000)
    expect(await firstMovieName.getText()).toBe(searchFilmName)
  })

  it('results(all of them) should contain search request', async function(){
    let searchFilmName = 'Fight Club'
    let searchField = $$('[name="searchStr"]')
    let searchButton = $('.input-group-btn')
    let MoviesName = $$('movies > div:nth-child(3) .text-ellipsis > a[title]')
    await browser.get('/')

    await searchField.sendKeys(searchFilmName)
    await searchButton.click()
    await browser.sleep(3000)
    expect(await MoviesName.getText()).toContain(searchFilmName)
    console.log(await MoviesName.getText())
    // not all films in search results has search request
  })

  it('result should be empty, after request for nonexistent movie', async function(){
    let searchUnexistingFilm = '43fer4'
    let searchField = $$('[name="searchStr"]')
    let searchButton = $('.input-group-btn')
    let MoviesName = $$('movies > div:nth-child(3) .text-ellipsis > a[title]')
    await browser.get('/')

    await searchField.sendKeys(searchUnexistingFilm)
    await searchButton.click()
    await browser.sleep(3000)
    expect(await MoviesName.count()).toEqual(0)
    console.log(await MoviesName.count())
  })
})


