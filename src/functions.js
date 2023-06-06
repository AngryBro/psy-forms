export const textToHtml = text => {
    // return text===null?<div/>:text.split('\n').map((str, i) => <div key={i}>{str.length?str:<br/>}</div>);
    return text===null?"":text.replace(/\n/g, "<br>");
};

 export const htmlToText = html => {
    return html==="\n"?"":html.replace(/<div><br><\/div>/g, "<div></div>").replace(/<\/div>/g, "").replace(/<div>/g, "\n").replace(/<br>/g, "\n");
};