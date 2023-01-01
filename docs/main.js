const listOfNotes = [];
const repoUrl = 'https://api.github.com/repos/ambujsahu81/Notes/contents'
const noteExtension = '.txt'
const Readme = 'README.md'
const backSlash = '/'
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

const updateDom = () => {
    
    getDomElement('Title').textContent = 'Small collection of usefull notes'

    // align content elements
    const wrapperStyle = getDomElement('wrapper').style 
    wrapperStyle.display = 'flex';
    wrapperStyle.flexDirection = 'column'
    wrapperStyle.alignItems = 'center'
    wrapperStyle.fontFamily = ' system-ui'


    let listElement =  getDomElement('List');
    listElement.style.marginLeft = '-4%'
    const customUL = document.createElement('ul');    
    for ( const note of listOfNotes ) {
        const newLiElement = document.createElement('li');

        // update li element
        newLiElement.textContent = note.title;
        newLiElement.style.listStyle = 'auto'
        newLiElement.style.margin = '1rem'
        

        // add a link tag as well
        const newSpanElement = document.createElement('span');
        newSpanElement.innerHTML = '&#8594;'
        newSpanElement.style.paddingLeft = '0.5rem'
        newSpanElement.style.fontSize = '1rem'

        newLiElement.appendChild(newSpanElement);

        customUL.appendChild(newLiElement);
    }
    listElement.appendChild(customUL)
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
                       path: path.replace('(','').replace(')','').replace('\n\n ',''),
                       content: '' } )
       }
    }
}

const parseContent = ( str ) => {
    if ( !str ) { 
        return;
    }

    console.log( str );
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

const intialize = async () => {
    // fetch notes
    const response = await fetchNotesList();
    parseNotes(decodeBase64Str( response?.content ));

    // fetch content
    const responseContent = await fetchNoteContent();
    for ( const { content } of responseContent ) {
        parseContent( decodeBase64Str( content ) );
    }
    updateDom(); 
}

intialize();



