const listOfNotes = [];
const repoUrl = 'https://api.github.com/repos/ambujsahu81/Notes/contents'
const noteExtension = '.txt'
const Readme = 'README.md'
const backSlash = '/'
const skip = (num) => new Array(num);

const addNote = ( { title, category, path, content } ) => listOfNotes.push( { title, category, path, content } )

const getListOfNotes = () => listOfNotes.map(({ title }) => title)

const getNoteContentByTitle = ( { title } ) => listOfNotes.filter( note => note.title === title )?.content

const getNoteContentUrl = ( { path } ) => concat( repoUrl, path, skip(1), backSlash )

const getDomElement = ( elm ) => document.getElementById( elm );

const handleError = ( err ) => getDomElement('Error').textContent = `Error: ${err}`

const urlWithHeaders = ( url ) => concat(url,'Content-Type=application/vnd.github.raw',skip(1),'?')

const concat = ( str1, str2=null, str3=null, separator ) => [str1,str2,str3].join(separator).replace(/.$/,'');

const updateDom = () => {
    let listElement =  getDomElement('List');
    const customUL = document.createElement('ul');
    for ( const note of listOfNotes ) {
        const newLiElement = document.createElement('li');
        newLiElement.textContent = note.title;
        customUL.appendChild(newLiElement);
    }
    listElement.appendChild(customUL)
}

const parseNotes = ( str ) => {
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

// api calls
const fetchNotesList = async () => {
    try {
        const response = await fetch( urlWithHeaders( concat( repoUrl, Readme, skip(1), backSlash  ) ) )
        if (response.ok) {
            console.log(respose);
            return  response.text();              
        }
        handleError( new Error(`${response.status}`) )    
    } catch (error) {
        handleError(error)
    }
}

const intialize = async () => {
    const response = await fetchNotesList();
    parseNotes(response);
    console.log('does it work');
    // to-do getContent()
    updateDom(); 
}

intialize();



