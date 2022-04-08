import { useCallback, useEffect, useState } from "react";
const PubUi = ( props ) => {

    const [keywordList, setKeywordList] = useState([]);
    const handleKeywordList = useCallback((e) => {
        console.log(e.keyCode);
        if((e.keyCode == 13 || e.keyCode == 188) && (e.target.value !="")){
            let item = document.createElement("span");
            let text = document.createElement("span");
            let button = document.createElement("button");
            let text_inner = document.createTextNode(e.target.value);
            if(e.keyCode == 188){
                text_inner = document.createTextNode(e.target.value.slice(0, -1));
            }

            let button_inner = document.createTextNode("닫기");
            item.classList.add("item");
            text.classList.add("text");
            button.setAttribute("type", "button");
            text.appendChild(text_inner);
            button.appendChild(button_inner);
            item.appendChild(text);
            item.appendChild(button);
            e.target.previousElementSibling.append(item);
            e.target.value = "";
            button.addEventListener("click", (e)=>{
                e.preventDefault();
                e.target.closest(".item").remove();
            });
        }
        //setKeywordList(true);
        }, [setKeywordList]);

    return (
        <>
            <div className="text-help"><p>키워드를 입력하시고 '엔터' 또는 쉼표(,)를 누르시면 추가 됩니다.</p></div>
            <div className="cpnt_keyword">
                <label className="cpnt-in" htmlFor="keyword">
                    <span className="keywordList"></span>
                    <input type="text" name="keyword" onKeyUp={handleKeywordList}></input>
                </label>
            </div>
        </>
    );
};

export default PubUi;