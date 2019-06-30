import getImage from '../../Image/elements/image';

export default function getCardDom(card = {}, imageType , defaultImageType){

    let { images , title } = card;
    let imageObj = images[imageType] || images[defaultImageType] || {};
    const { url } = imageObj;
    return (
        `<div class="img-wrap">
            ${getImage(url , title)}
        </div>`
    )
}