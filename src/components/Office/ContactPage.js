/*global kakao*/
import React,{useEffect} from 'react'

function ContactPage() {
    const { kakao } = window;
    useEffect(() => {
        let container = document.getElementById("map");
                let options = {
                    center: new kakao.maps.LatLng(37.53927, 127.04669),
                    level: 1,
                    mapTypeId: kakao.maps.MapTypeId.ROADMAP
                };
                const map = new window.kakao.maps.Map(container, options);
                let marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(37.53927, 127.04669), // 마커의 좌표
                    map: map // 마커를 표시할 지도 객체
                });
    }, [])
    return (
        <div style={{display:'flex',height:'100vh',flexDirection:'column',textAlign:'left',justifyContent:'flex-end'}}>
                <p>A. 04774 서울특별시 성동구 성덕정길 25 2층</p>
                <p>E. mail@viron.kr</p>
             <div id="map" style={{width:"840px",height:"400px",marginBottom:'5rem'}}></div>
        </div>
    )
}

export default ContactPage
