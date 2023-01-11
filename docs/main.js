const repoUrl = 'https://api.github.com/repos/ambujsahu81/Notes/contents'
const noteExtension = '.txt'
const Readme = 'README.md'
const backSlash = '/'
const colorPink = '#F48C8C'
const colorBlack = '#0F0F0F'
const whiteColor = '#FFFFFF'
const grey = 'rgb(249 244 244)'
let colorBlue = 'rgb(109 133 191)'
const normalSize = '1rem';
const bigSize = "1.1rem";
let goBackBtn = ''
let listOfNotes = [];
const colorCollection = [ 'rgb(247 245 194)', 'rgb(241 251 200)','rgb(255 253 197)','rgb(255 218 218)' ]
const buttonStyle = `background: ${whiteColor};padding:0.4rem;marginLeft:1rem;display:none;font-family:monospace;font-size: 1rem;`

const skip = (num) => new Array(num);

const addNote = ( { title, category, path, content } ) => listOfNotes.push( { title, category, path, content } )

const getListOfNotes = () => listOfNotes.map( ( { title } ) => title)

const getAllNotesCategory = () => [...new Set(listOfNotes.map( ( { category } ) => category))]

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
       case deviceWidth >= 1366: widthOfContent = '62%';break;
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
//        colorBlue = 'rgb(51 0 255)';
        // console.log(document.querySelectorAll('allFilesId'))
        getDomElement('darkMode').innerHTML = '<i class="fa fa-moon"></i>'
        styleElement(document.body,`background:${whiteColor};color:${colorBlack};`)
        styleAllElement("button", { 'background':whiteColor, 'border': `1px solid ${colorBlack}`, 'color': `${colorBlack}` })
        styleAllElement("p", { 'color':`${colorBlack}`}) 
        styleAllElement("h3", { 'color':`${colorBlack}`})            
    } else {
  //    styleElement(getDomElement('allFilesId'),`color:rgb(109, 133, 191);`)
        // console.log(document.querySelectorAll('#allFilesId'))
        getDomElement('darkMode').innerHTML = '<i class="fa fa-sun"></i>'
        styleElement(document.body,`background:${colorBlack};color:rgb(187 124 136);`)
        styleAllElement("button", { 'background':colorBlack, 'border': `1px solid rgb(187 124 136)`, 'color': `rgb(187 124 136)` })
        styleAllElement("h3", { 'color':`rgb(155 42 64)`})
        styleAllElement("p", { 'color':`rgb(213 0 41)`})    
    }
}


const hovereffect = ( flag, element ) => {
    if ( flag ) {
        element.style.textDecoration  = `underline`
        element.style.textDecorationColor = colorBlue;
    } else {
        element.style.textDecoration = `none`
    }
}

const showList = ()=> {
    getDomElement('toolBarWrapper').style.justifyContent = 'flex-end'
    getDomElement('List').style.display = 'block'
    getDomElement('content').style.display = 'none'
    goBackBtn.style.display = 'none'
    localStorage.removeItem("Note");
    updateMainTitle( `Small collection of usefull notes <i class="fa-solid fa-book"></i>` )
}


const updateDom = () => {
    showList();
    let listElement =  getDomElement('List');
    listElement.style.marginLeft = '2%'
    listElement.innerHTML = ''
    const root = createDomElement('ul');
    const rootLiElement = createDomElement('li');
    rootLiElement.style.listStyle = 'none'
    const folderList = createDomElement('ul');
    const newSpanElement = createDomElement('span');
    newSpanElement.innerHTML = `<i class="fa fa-folder-open"></i>`
    newSpanElement.style.paddingLeft = '0.5rem'
    newSpanElement.style.fontSize = '1rem'
    const newSpanElementCategory = createDomElement('span');
    newSpanElementCategory.style.paddingLeft = '0.5rem'
    newSpanElementCategory.style.fontSize = '1rem'
    newSpanElementCategory.textContent = `root/`
    rootLiElement.appendChild(newSpanElement);
    rootLiElement.appendChild(newSpanElementCategory);
    rootLiElement.appendChild(folderList);
    folderList.style.borderLeft = '1px solid';
    folderList.style.marginLeft = '1rem';
    folderList.style.marginTop = '0rem';
    folderList.style.paddingTop = '1rem';    
    folderList.style.paddingLeft =  '0rem';

    root.appendChild(rootLiElement);
    listElement.appendChild(root);

    for ( const category of getAllNotesCategory() ) {
        const folderLiElement = createDomElement('li');

        folderLiElement.style.listStyle = 'none'
        folderLiElement.style.marginTop = '1rem'
        const newSpanElementFolderLine = createDomElement('span');
        newSpanElementFolderLine.style.borderBottom = `1px solid`;
        newSpanElementFolderLine.style.width = '1.2rem';
        newSpanElementFolderLine.style.display = 'inline-block';
        newSpanElementFolderLine.style.marginBottom = '0.3rem';

        const newSpanElement = createDomElement('span');
        newSpanElement.innerHTML = `<i class="fa fa-folder-open"></i>`
        newSpanElement.style.paddingLeft = '0.2rem'
        newSpanElement.style.fontSize = '1rem'
        const newSpanElementCategory = createDomElement('span');
        newSpanElementCategory.style.paddingLeft = '0.5rem'
        newSpanElementCategory.style.fontSize = '1rem'
        newSpanElementCategory.textContent = `${category}/`
        folderLiElement.appendChild(newSpanElementFolderLine);
        folderLiElement.appendChild(newSpanElement);
        folderLiElement.appendChild(newSpanElementCategory);

        const fileList = createDomElement('ul');
        fileList.style.marginLeft = '1rem'
        fileList.style.paddingBottom = '0rem'
        fileList.style.paddingLeft = '0rem'
        fileList.id = `category${category.replaceAll(" ","")}ul`
        folderLiElement.appendChild(fileList)
        folderList.appendChild(folderLiElement);
    }

    let index = 0;    
    for ( const note of listOfNotes ) {
        const fileListUL = getDomElement(`category${note.category.replaceAll(" ","")}ul`)
        const newLiElement = createDomElement('li');
        // update li element

        newLiElement.style.listStyle = 'none'
        newLiElement.id = `li${index}`


        // add a link tag as well
        const newSpanElementFile = createDomElement('span');
        newSpanElementFile.textContent = `${note.title.replaceAll(' ','_').replace('_','')}.txt`;
        newSpanElementFile.id = `span${index}`
        newSpanElementFile.style.color = colorBlue
        newSpanElementFile.style.marginLeft = '0.2rem'
        newSpanElementFile.setAttribute('onmouseover', `hovereffect( true, li${index} )` )
        newSpanElementFile.setAttribute('onmouseout', `hovereffect( false, li${index} )` )
        const newSpanElementFileLine = createDomElement('span');
        newSpanElementFileLine.style.borderBottom = `1px solid`;
        newSpanElementFileLine.style.borderLeft = `1px solid`;
        newSpanElementFileLine.style.height = `1.5rem`
        newSpanElementFileLine.style.width = '2rem';
        newSpanElementFileLine.style.display = 'inline-block';
        newSpanElementFileLine.style.marginBottom = '0.3rem';
        newSpanElementFileLine.style.marginLeft = '1rem'
        const newSpanElement = createDomElement('span');
        newSpanElement.innerHTML = '<i class="fa-regular fa-file"></i>'
        newSpanElement.style.paddingLeft = '0.2rem'
        newSpanElement.style.fontSize = '1rem'
        newSpanElement.style.cursor = 'pointer'
        newLiElement.appendChild(newSpanElementFileLine);
        newLiElement.appendChild(newSpanElement);
        newLiElement.appendChild(newSpanElementFile);
        newLiElement.addEventListener('click', (evt) => showContent(evt));

        fileListUL.appendChild(newLiElement);

        index++;
    }


}

const showContent = (evt) => {
    getDomElement('toolBarWrapper').style.justifyContent = 'space-between'
    goBackBtn.style.display = 'block'
    let index = -1
    let note = skip(1)


    if(typeof evt === 'number') {
        index = evt
        note = listOfNotes[evt]
    } else {
        index = +evt.target.id.replace('span','')
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
        const card = createDomElement('div');

        const header = createDomElement('h3');
        header.id = `h1${sectionindex}`
        header.textContent = `# ${sectionHeader}`;
        header.style.padding = '0.3rem'
        // header.style.margin = '1rem'

        const paragraph = createDomElement('p');
        paragraph.id = `P${sectionindex}`
        paragraph.innerHTML = note.content.paragraph[sectionindex].replaceAll('\n','<br>').replaceAll('                            ',' ').replaceAll(' ','&nbsp;')
        // paragraph.style.margin = '1rem'
        paragraph.style.padding = '1rem'
        paragraph.style.marginTop = '-1rem'
        if ( note.content.paragraph[sectionindex].includes('=') ) {
           paragraph.style.overflowX = "scroll";
        } else {
           paragraph.style.whiteSpace = "normal" 
           paragraph.style.overflowWrap = "anywhere"
        } 
        paragraph.style.borderBottomLeftRadius = '1rem' 
        paragraph.style.borderBottomRightRadius = '1rem'
        paragraph.style.background = whiteColor
        paragraph.style.marginBottom = '1rem'
        card.style.paddingInline = '0.5rem'     
        card.style.background = getRandomColor()
        card.style.borderRadius = '1rem'
        sectionindex++;

        card.appendChild(header);
        card.appendChild(paragraph);
        content.appendChild(card)
    }
    if(window.getComputedStyle(document.body).background.includes('rgb(15, 15, 15)')) {
        styleAllElement("h3", { 'color':`rgb(155 42 64)`})
        styleAllElement("p", { 'color':`rgb(213 0 41)`})  
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
    styleElement(toolBarWrapper,`display:flex;align-items:flex-start;justify-content:space-between;width:${getWidth()};padding-inline:1rem;`)
    const toggleDarkMode = createDomElement('button');
    toggleDarkMode.id = 'darkMode'
    toggleDarkMode.innerHTML = `<i class="fa fa-sun"></i>`;

    toggleDarkMode.setAttribute('onclick', 'darkModeJs()')
    styleElement(toggleDarkMode,buttonStyle);


    goBackBtn = createDomElement('button');
    goBackBtn.id = 'gobackbtn'
    goBackBtn.setAttribute('onclick', 'updateDom()')
    goBackBtn.innerHTML = '<i class="fa fa-arrow-left-long"></i>'
    styleElement(goBackBtn,buttonStyle)
    toolBarWrapper.appendChild(goBackBtn)
    toolBarWrapper.appendChild(toggleDarkMode)
    darkModeJs()
 
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
   try{ 
   updateIntialPage();
   await fetchAllData();
   doneLoading();
   } catch (error) {
        handleError(error)
   }
})();




