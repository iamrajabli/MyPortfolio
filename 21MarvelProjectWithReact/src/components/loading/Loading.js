import img from '../loading/loading.gif';

const Loading = () => {
    return (
        <img style={{ display: 'block', width: "450px", height: "200px", objectFit: 'contain', margin: "0 auto" }} src={img} alt="" />
    )
}

export default Loading;