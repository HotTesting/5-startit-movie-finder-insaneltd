import {browser, element, By, $$, $, by, ExpectedConditions as EC} from 'protractor'
import {all, async} from "q";
import any = jasmine.any;

describe('Movie details', async function () {
  beforeEach(async function () {
    await browser.get('/', 10000)
  })

  it('should have movie name as header', async function () {
    let filmName = element(By.cssContainingText('.text-ellipsis a', 'Whiplash'))
    let filmNameText = await element(By.cssContainingText('.text-ellipsis a', 'Whiplash')).getText()
    let filmHeader = $('.row > div:nth-child(2) > h2')
    await filmName.click()
    await browser.wait(EC.visibilityOf(filmHeader), 5000, 'Film name is not displayed')
    expect(await filmHeader.getText()).toContain(filmNameText)
  })

  // Test with Implicit wait
  it('should have movie name as header', async function () {
    await browser.manage().timeouts().implicitlyWait(5000)
    let filmName = element(By.cssContainingText('.text-ellipsis a', 'Whiplash'))
    let filmNameText = await element(By.cssContainingText('.text-ellipsis a', 'Whiplash')).getText()
    let filmHeader = $('.row > div:nth-child(2) > h2')
    await filmName.click()
    expect(await filmHeader.getText()).toContain(filmNameText)
  })

  it('should have raiting', async function () {
    let filmName = element(By.cssContainingText('.text-ellipsis a', 'Whiplash'))
    await filmName.click()
    let raiting = $('h2 > .label')
    await browser.wait(EC.visibilityOf(raiting), 5000, 'Raiting is not displayed')
    console.log(await raiting.getText() + ' - raiting of desired film')
  })

  it('should have simular movies block with atleast one movie', async function () {
    let filmName = element(By.cssContainingText('.text-ellipsis a', 'Whiplash'))
    await filmName.click()
    let similarMoviesBlock = element(By.cssContainingText('h2', 'Similar Movies'))
    let similarFilms = $$(' .is-flex a[title]')
    await browser.wait(EC.visibilityOf(similarMoviesBlock), 3000, 'Similar movie block is not present')
    expect(await similarFilms.count()).toBeGreaterThanOrEqual(1)
    console.log(await similarFilms.count() + ' - counted films with similar genre')
  })

  describe('cast block', async function () {
    it('should show at least one actor', async function () {
      let filmName = element(By.cssContainingText('.text-ellipsis a', 'Whiplash'))
      await filmName.click()
      let castBlock = element(By.cssContainingText('h3', 'Cast'))
      let actors = $$('.thumbnail .text-center a')
      await browser.wait(EC.visibilityOf(castBlock), 3000, 'Cast block is not displayed')
      expect(await actors.count()).toBeGreaterThanOrEqual(1)
      console.log(await actors.count() + ' - actors were find in Cast section')
    })
  })

  describe('reviews block', function () {
    beforeEach(async function () {
      let filmName = element(By.cssContainingText('.text-ellipsis a', 'Whiplash'))
      await filmName.click()
    })

    it('should be at least one review', async function () {
      let reviewsBlock = element(By.cssContainingText('h2', 'Reviews'))
      let reviewers = $$('.col-md-6 cite')
      await browser.wait(EC.visibilityOf(reviewsBlock), 3000, 'No reviews for this movie')
      expect(await reviewers.count()).toBeGreaterThanOrEqual(1)
      console.log(await reviewers.count() + ' - reviewers')
    })

    it('should have reviewer name as link to source', async function () {
      let reviewers = $('.col-md-6 cite')
      let reviewersLink = $$('.col-md-6 cite a').get(0)
      await browser.wait(EC.visibilityOf(reviewers), 3000, 'No reviews for this movie')
      expect(await  reviewersLink.getAttribute('href')).toContain('https://www.themoviedb.org')
      console.log(await reviewersLink.getAttribute('href') + ' - link for reviews')
    })
  })
})

describe('Popular series', async function () {
  // Before each test - to click on Popular Series button
  beforeEach(async function () {
    let popularSeriesButton = $$('#navbar li:nth-child(2)')
    await popularSeriesButton.click()
  })

  it('shouldnt have search bar', async function () {
    let searchField = $('[name="searchStr"]')
    let pageHeader = await $('.orange-text')
    await browser.wait(EC.and(EC.visibilityOf(pageHeader), EC.invisibilityOf(searchField)), 3000, 'Page is not loaded')
  })

  it('should have "First Air Date" instead "Release Date"', async function () {
    let releaseDate = $('.caption p strong')
    await browser.wait(EC.visibilityOf(releaseDate))
    expect(await releaseDate.getText()).toEqual('First Air Date:')
  })
})



