// import {useState} from 'react';

const styles = {
    marginVertical: {marginTop: 5, marginBottom: 5},
    marginHorizontal: {marginLeft: 5, marginRight: 5},
    paddingVertical: {paddingTop: 5, paddingBottom: 5},
    paddingHorizontal: {paddingLeft: 5, paddingRight: 5},
    padding: { padding : 10 },
    tab: { marginLeft: 10 },
    tabplus: { marginLeft: 20},
    borderRadius: { borderRadius: 5 },
    backgroundLightPrimary: {backgroundColor: "#e1ffed"}
}

function RenderHeading({item}) {
    return (
        <div style={styles.marginVertical}>
            <h3>{item.text}</h3>
        </div>
    )
}

function RenderText({item}) {
    return (
        <div style={styles.marginVertical}>
            {item.text}
        </div>
    )
}

function RenderComment({item}) {
    return (
        <div style={{...styles.marginVertical, ...styles.borderRadius, ...styles.backgroundLightPrimary, ...styles.padding}}>
            {item.text}
        </div>
    )
}

function RenderBullet({item}) {
    return (
        <div style={styles.marginVertical}>
            {item.elements.map((element, index) => (
                <p key={index}>•    {element}</p>
            ))}
        </div>
    )
}

function RenderNumbered({item}) {
    return (
        <div style={styles.marginVertical}>
            {item.elements.map((element, index) => (
                <p key={index}>{index + 1} •    {element}</p>
            ))}
        </div>
    )
}

function RenderChecklist({item}) {
    return (
        <div style={styles.marginVertical}>
            {item.elements.map((element, index) => (
                <p key={index}>✅    {element}</p>
            ))}
        </div>
    )
}

function RenderImage({item}) {
    return (
        <div style={{...styles.marginVertical, width: '66.66%'}}>
            <img src={item.link} style={{...styles.borderRadius, objectFit: 'contain', width: '100%'}} />
        </div>
    )
}

function RenderVideo({item}) {
    return (
        <div style={styles.marginVertical}>
            <video 
                src={item.link} 
                controls 
                width="640" 
                height="360"
                playsinline
                style={styles.borderRadius}
            >
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

function RenderHyperlink({item}) {
    return (
        <div style={styles.marginVertical}>
            <a href={item.link} target="_blank" style={{color: "#99c1a9"}} >{item.text}</a>
        </div>
    )
}

export default function TutorialRender({content =
    {
        title: '',
        author: '',
        date: '',
        keywords: [''],
        sections: [{type: ''}]
    }
}) {
    if(content)
    return (
        <div>
            <h1>{content.title}</h1>
            <p>By {content.author}      {content.date} </p>
            {content.sections.map( (item, index) => {
                switch(item.type){
                    case 'heading': { return <RenderHeading key={index} item={item}/> }
                    case 'text': { return <RenderText key={index} item={item}/> }
                    case 'comment': { return <RenderComment key={index} item={item}/> }
                    case 'bulletlist': { return <RenderBullet key={index} item={item}/> }
                    case 'numberedlist': { return <RenderNumbered key={index} item={item}/> }
                    case 'checklist': { return <RenderChecklist key={index} item={item}/> }
                    case 'image': { return <RenderImage key={index} item={item}/> }
                    case 'video': { return <RenderVideo key={index} item={item}/> }
                    case 'link': { return <RenderHyperlink key={index} item={item}/> }
                }
            })}
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: "1rem"}}>
                {content.keywords.map((keyword, index) => <div style={{
                    padding: '0.4rem 0.8rem',  backgroundColor: '#f3f4f6',
                    borderRadius: '20px', fontSize: '0.85rem',
                    cursor: 'pointer'}} key={index}>{keyword}</div>
                )}
            </div>
        </div>
    )
    else return null
}