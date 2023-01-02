const repoUrl = 'https://api.github.com/repos/ambujsahu81/Notes/contents'
const noteExtension = '.txt'
const Readme = 'README.md'
const backSlash = '/'
const colorBlue = '#2D67EF'
const colorPink = '#F48C8C'
const colorBlack = '#0F0F0F'
const whiteColor = '#FFFFFF'
const grey = '#EEEEEE'
const normalSize = '1rem';
const bigSize = "1.1rem";
let goBackBtn = ''
let listOfNotes = [];


const skip = (num) => new Array(num);

const addNote = ( { title, category, path, content } ) => listOfNotes.push( { title, category, path, content } )

const getListOfNotes = () => listOfNotes.map( ( { title } ) => title)

const getAllPath = () => listOfNotes.map( ( { path } ) => path )

const getNoteContentByTitle = ( { title } ) => listOfNotes.filter( note => note.title === title )?.content

const getNoteContentUrl = ( { path } ) => concat( repoUrl, path, skip(1), backSlash )

const getDomElement = ( elm ) => document.getElementById( elm );

const handleError = ( err ) => getDomElement('Error').textContent = `Error: ${err}`

const urlWithHeaders = ( url ) => concat(url,'Content-Type=application/vnd.github.raw',skip(1),'?')

const decodeBase64Str = ( str ) =>  atob( str )

const concat = ( str1, str2=null, str3=null, separator ) => [str1,str2,str3].join(separator).replace(/.$/,'');


const hovereffect = ( flag, element ) => {
    if ( flag ) {
        element.style.color = `${colorBlue}`
    } else {
        element.style.color = `${colorBlack}`
    }
}

const showList = ()=> {
    getDomElement('List').style.display = 'block'
    getDomElement('content').style.display = 'none'
    goBackBtn.display = 'none'
    localStorage.removeItem("Note");
    getDomElement('Title').textContent = 'Small collection of usefull notes'
}


const updateDom = () => {

    showList();
    let listElement =  getDomElement('List');
    listElement.style.marginLeft = '-4%'
    listElement.innerHTML = ''
    const customUL = document.createElement('ul');    
    let index = 0;    
    for ( const note of listOfNotes ) {
        const newLiElement = document.createElement('li');

        // update li element
        newLiElement.textContent = note.title;
        newLiElement.style.listStyle = 'auto'
        newLiElement.style.padding = '0.5rem'

        newLiElement.id = `li${index}`
        newLiElement.style.cursor = 'pointer'
        newLiElement.setAttribute('onmouseover', `hovereffect( true, li${index} )` )
        newLiElement.setAttribute('onmouseout', `hovereffect( false, li${index} )` )

 
        // add a link tag as well
        const newSpanElement = document.createElement('span');
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
    goBackBtn.display = 'block'
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
   
    getDomElement('Title').textContent = note.title;
    getDomElement('List').style.display = 'none'
    const content = getDomElement('content');
    content.innerHTML = ''
    content.style.display = 'block'
    content.style.width = '65%' 
    let sectionindex = 0;
    for( const sectionHeader of note.content.headers ) {

        const header = document.createElement('h3');
        header.id = `h1${sectionindex}`
        header.textContent = sectionHeader;
        header.style.margin = '1rem'


        const paragraph = document.createElement('p');
        paragraph.id = `P${sectionindex}`
        console.log(note.content.paragraph[sectionindex])
        paragraph.innerText = note.content.paragraph[sectionindex]
        paragraph.style.margin = '1rem'
        paragraph.style.padding = '1rem'
        paragraph.style.overflowX = "scroll";
        paragraph.style.background = grey

        sectionindex++;
      content.appendChild(header);
      content.appendChild(paragraph);
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

updateIntialPage = () =>{
    // align content elements
    const wrapperStyle = getDomElement('wrapper').style
    wrapperStyle.display = 'flex';
    wrapperStyle.flexDirection = 'column'
    wrapperStyle.alignItems = 'center'
    wrapperStyle.fontFamily = ' system-ui'

    const btnWrapper = getDomElement('btnWrapper').style
    btnWrapper.display = 'flex'
    btnWrapper.width = '65%'
    btnWrapper.alignItems = 'flex-start'

    goBackBtn = getDomElement('gobackbtn').style
    goBackBtn.background = whiteColor
    goBackBtn.border = '2px solid';
    goBackBtn.padding = '0.5rem'
    goBackBtn.marginLeft = '1rem'
    goBackBtn.display = 'none'
}

const intialize = async () => {
    updateIntialPage()
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
    console.log(listOfNotes)

    if ( localStorage.getItem('Note') ) {
        const noteIndex = +localStorage.getItem('Note')
        showContent(noteIndex)
    } else {
        updateDom(); 
    }

}

intialize();



