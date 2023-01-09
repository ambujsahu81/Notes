const repoUrl = 'https://api.github.com/repos/ambujsahu81/Notes/contents'
const noteExtension = '.txt'
const Readme = 'README.md'
const backSlash = '/'
const colorBlue = '#2D67EF'
const colorPink = '#F48C8C'
const colorBlack = '#0F0F0F'
const whiteColor = '#FFFFFF'
const grey = 'rgb(249 244 244)'
const normalSize = '1rem';
const bigSize = "1.1rem";
let goBackBtn = ''
let listOfNotes = [];
const colorCollection = [ 'rgb(255 255 244)', 'rgb(243 249 217)','rgb(253 252 229)', 'rgb(245 247 253)','rgb(249 234 234)' ]
const buttonStyle = `background: ${whiteColor};border:1px solid;padding:0.5rem;marginLeft:1rem;display:none;font-family:monospace;font-size: 0.7rem;`

const skip = (num) => new Array(num);

const addNote = ( { title, category, path, content } ) => listOfNotes.push( { title, category, path, content } )

const getListOfNotes = () => listOfNotes.map( ( { title } ) => title)

const getAllPath = () => listOfNotes.map( ( { path } ) => path )

const getNoteContentByTitle = ( { title } ) => listOfNotes.filter( note => note.title === title )?.content

const getNoteContentUrl = ( { path } ) => concat( repoUrl, path, skip(1), backSlash )

const getRandomColor = () => colorCollection[  Math.floor(Math.random() *  colorCollection.length) ] 

const getDomElement =  ( elm )  => document.getElementById( elm );

const createDomElement = ( elm )  => document.createElement( elm );

const styleElement = ( element, cssText ) => {  element.style.cssText = `${cssText}` }

const styleAllElement = ( element , cssText ) => { Array.from( document.getElementsByTagName( element )).forEach( b => Object.keys(cssText).forEach(property =>
    cssText[property] === 'random' ? b.style[property] = getRandomColor() : b.style[property] = `${cssText[property]}`)) }

const handleError = ( err )  => getDomElement('Error').textContent = `Error: ${err}`

const handleWarning = ( err )  => getDomElement('Error').textContent = `Warning: ${err}`

const removeErrOrWarnings = () => getDomElement('Error').textContent = ''

const updateMainTitle = ( title ) => getDomElement('Title').innerHTML = title

const urlWithHeaders = ( url ) => concat(url,'Content-Type=application/vnd.github.raw',skip(1),'?')

const decodeBase64Str = ( str ) =>  atob( str )

const concat = ( str1, str2=null, str3=null, separator ) => [str1,str2,str3].join(separator).replace(/.$/,'');

const getWidth = () => {
    const deviceWidth = window.screen.width;
    let widthOfContent = '60%'
    switch( true ) {
       case deviceWidth >= 1366: widthOfContent = '65%';break;
       case deviceWidth >= 1266: widthOfContent = '70%';break;
       case deviceWidth >= 1150: widthOfContent = '75%';break;
       case deviceWidth >= 1074: widthOfContent = '80%';break;
       case deviceWidth >= 820:  widthOfContent = '85%';break;
       case deviceWidth >= 600:  widthOfContent = '90%';break;
       default : widthOfContent = '90%';
    }
    return widthOfContent;
}

const darkModeJs = () => { 
    if( window.getComputedStyle(document.body).background.includes('rgb(15, 15, 15)')) {
        styleElement(document.body,`background:${whiteColor};color:${colorBlack};`)
        styleAllElement("button", { 'background':whiteColor, 'border': `1px solid ${colorBlack};`, 'color': `${colorBlack}` })
        styleAllElement("p", { 'background':`random`,'color':`${colorBlack}`})        
    } else {
        styleElement(document.body,`background:${colorBlack};color:rosybrown;`)
        styleAllElement("button", { 'background':colorBlack, 'border': `1px solid ${whiteColor};`, 'color': `rosybrown` })
        styleAllElement("p", { 'background':`${whiteColor}`,'color':`brown`})    
    }
}


const hovereffect = ( flag, element ) => {
    if ( flag ) {
        element.style.color = `${colorBlue}`
    } else {
        element.style.color = `inherit`
    }
}

const showList = ()=> {
    getDomElement('List').style.display = 'block'
    getDomElement('content').style.display = 'none'
    goBackBtn.style.display = 'none'
    localStorage.removeItem("Note");
    updateMainTitle( 'Small collection of usefull notes <i class="fa-solid fa-book"></i>' )
}


const updateDom = () => {
    showList();
    let listElement =  getDomElement('List');
    listElement.style.marginLeft = '-4%'
    listElement.innerHTML = ''
    const customUL = createDomElement('ul');    
    let index = 0;    
    for ( const note of listOfNotes ) {
        const newLiElement = createDomElement('li');

        // update li element
        newLiElement.textContent = note.title;
        newLiElement.style.listStyle = 'auto'
        newLiElement.style.padding = '0.5rem'
        newLiElement.id = `li${index}`
        newLiElement.style.cursor = 'pointer'
        newLiElement.setAttribute('onmouseover', `hovereffect( true, li${index} )` )
        newLiElement.setAttribute('onmouseout', `hovereffect( false, li${index} )` )
 
        // add a link tag as well
        const newSpanElement = createDomElement('span');
        newSpanElement.innerHTML = '&#8594;'
        newSpanElement.style.paddingLeft = '0.5rem'
        newSpanElement.style.fontSize = '1rem'
        newLiElement.appendChild(newSpanElement);
        customUL.appendChild(newLiElement);
        index++;
    }
    customUL.addEventListener('click', (evt) => showContent(evt));
    listElement.appendChild(customUL)
}

const showContent = (evt) => {
    goBackBtn.style.display = 'block'
    let index = -1
    let note = skip(1)

    if(typeof evt === 'number') {
        index = evt
        note = listOfNotes[evt]
    } else {
        index = +evt.target.id.replace('li','')
        note = listOfNotes[index]
    }

    localStorage.setItem("Note", index);
   
    updateMainTitle( note.title );
    getDomElement('List').style.display = 'none'
    const content = getDomElement('content');
    content.innerHTML = ''
    content.style.display = 'block'
    content.style.width = getWidth(); 
    let sectionindex = 0;
    for( const sectionHeader of note.content.headers ) {

        const header = createDomElement('h3');
        header.id = `h1${sectionindex}`
        header.textContent = `# ${sectionHeader}`;
        header.style.margin = '1rem'

        const paragraph = createDomElement('p');
        paragraph.id = `P${sectionindex}`
        paragraph.innerHTML = note.content.paragraph[sectionindex].replaceAll('\n','<br>').replaceAll('                            ',' ').replaceAll(' ','&nbsp;')
        paragraph.style.margin = '1rem'
        paragraph.style.padding = '1rem'
        if ( note.content.paragraph[sectionindex].includes('=') ) {
           paragraph.style.overflowX = "scroll";
        } else {
           paragraph.style.whiteSpace = "normal" 
           paragraph.style.overflowWrap = "anywhere"
        }        
        paragraph.style.background = getRandomColor()
        paragraph.style.borderRadius = '1rem'
        paragraph.style.border ='1px solid';
        sectionindex++;
        content.appendChild(header);
        content.appendChild(paragraph);
    }
    if(window.getComputedStyle(document.body).background.includes('rgb(15, 15, 15)')) {
        styleAllElement("p", { 'background':`${whiteColor}`,'color':`brown`});
    }
}



const parseNotes = ( str ) => {
    if ( !str ) { 
        return;
    }
    let arrOfcategory = str.trim().split("- __")
    arrOfcategory.shift();
    for ( const category of arrOfcategory ) {
       let categoryName = category.split("__\n").shift();
       let notesInCatergory = category.split('-');
       notesInCatergory.shift();
       for ( const note of notesInCatergory ) { 
        let [ title, path ] = note.split(']');            
            addNote( { title: title.replace('[','') ,
                       category: categoryName,
                       path: path.replace('(','').replace(')','').replaceAll('\n','').replaceAll(' ',''),
                       content: '' } )
       }
    }
}

const parseContent = ( str , index ) => {
    if ( !str ) { 
        return;
    }
    const contentObj = {};
    contentObj.headers= [];
    contentObj.paragraph = [];
    section = str.split('--');
    section.shift()

    // extract the headers and paragraph
    for ( const content of section ) {
       tempArray = content.split('\n')
       const sectionHeader = tempArray[0].trim();
       contentObj.headers.push(sectionHeader)
       tempArray.shift()
       contentObj.paragraph.push(tempArray.join('\n'))
    }
    listOfNotes[index].content = contentObj;

}



// fetch calls
const fetchNotesList = async () => {
    try {
        const response = await fetch( urlWithHeaders( concat( repoUrl, Readme, skip(1), backSlash  ) ) )
        if (response.ok) {
            return await response.json();              
        }
        handleError( new Error(`${response.status}`) )    
    } catch (error) {
        handleError(error)
    }
}

const fetchNoteContent = async () => {    
    if ( !listOfNotes.length ) {
        return ;
    } 
    try {
        let requests = []
        for ( const path of getAllPath() ) {
            const request = fetch( urlWithHeaders( concat( repoUrl, path, skip(1), backSlash  ) ) )
            requests.push(request);
        }
        const responseArray = await Promise.all( requests );
        let parseResponse = []
        for ( const response of responseArray ) {
           if ( response.ok ) {
                parseResponse.push( response.json() )
           }
           // handleError( new Error(`${response.status}`) )  check if any response is failed or any error than report 
        }
        return await Promise.all( parseResponse );
    } catch (error) {
        handleError(error)
    }
}

const fetchAllData = async () => {
    // fetch notes
    const response = await fetchNotesList();
    parseNotes(decodeBase64Str( response?.content ));

    //fetch content
    const responseContent = await fetchNoteContent();
    let index = 0;
    for ( const { content } of responseContent ) {
        parseContent( decodeBase64Str( content ) , index );
        index++;
    }
}

updateIntialPage = () =>{
    // align content elements
    getDomElement('Title').style.paddingInline = '3rem'
    styleElement(document.body,'background:whiteColor' )
    getDomElement('Title').style.paddingInline = '3rem'
    updateMainTitle('')
    handleWarning( 'Loading... ' )
    const wrapper = getDomElement('wrapper')
    styleElement(wrapper,'display:flex;flex-direction:column;align-items:center;font-family:monospace;font-size: 0.9rem;')

    const toolBarWrapper = getDomElement('toolBarWrapper')
    styleElement(toolBarWrapper,`display:flex;align-items:flex-start;justify-content:space-between;width:${getWidth()}`)
    const toggleDarkMode = createDomElement('button');
    toggleDarkMode.id = 'darkMode'
    toggleDarkMode.textContent = 'Toggle dark mode';
    toggleDarkMode.setAttribute('onclick', 'darkModeJs()')
    styleElement(toggleDarkMode,buttonStyle);
    toolBarWrapper.appendChild(toggleDarkMode)

    goBackBtn = createDomElement('button');
    goBackBtn.id = 'gobackbtn'
    goBackBtn.setAttribute('onclick', 'updateDom()')
    goBackBtn.textContent = 'Go back'
    styleElement(goBackBtn,buttonStyle)
    toolBarWrapper.appendChild(goBackBtn)

 
}

doneLoading = () => {
    removeErrOrWarnings();
    getDomElement('darkMode').style.display = 'block'
    if ( localStorage.getItem('Note') ) {
        const noteIndex = +localStorage.getItem('Note')
        showContent(noteIndex)
    } else {
        updateDom(); 
    }
}

(async () => {
   updateIntialPage();
   await fetchAllData();
   doneLoading();
})();




