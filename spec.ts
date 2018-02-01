import { browser, element, By, $$} from 'protractor'

describe('Protractor', function () {
  it('Should find element by text', async function (){
    await browser.get('/')
    //finding element using cssContainingText selector
    let categoryText = element(By.cssContainingText('.list-group-item', 'Science Fiction'))
    //finding element using chaining
    let categoryChain = $$('.list-group-item').get(8)
    //finding element using pseudo selectors
    let filmFirst = $$('.row > div:last-child .is-flex > div:nth-child(1) .caption > .text-ellipsis >a').get(0)

    console.log(await categoryText.getText() + ' - element found using cssContainingText selector')
    console.log(await categoryChain.getText() + ' - element found using chaining')
    console.log(await filmFirst.getAttribute('title') + ' - element found using long selector')
  })
})


