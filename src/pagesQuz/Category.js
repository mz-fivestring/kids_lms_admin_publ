import { useCallback, useEffect, useState } from "react";
import { useToast } from "../components/hooks";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
// import CurriculumOrgDetail from "./CurriculumOrgDetail";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PageviewIcon from '@mui/icons-material/Pageview';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RemoveIcon from '@mui/icons-material/Remove';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderIcon from '@mui/icons-material/Folder';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import TooltipText from "../components/tooltip/TooltipText";
import TooltipBox from "../components/tooltip/TooltipBox";
import PopupDialog from "../components/popupDialog/PopupDialog";
import { useForm } from "react-hook-form";
const QuzCategory = () => {
  const { showToast } = useToast();

  const [isOpenDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const handleDeleteButton = useCallback(() => {
    setOpenDeleteConfirm(true);
  }, [setOpenDeleteConfirm]);

  const [isOpenApplyConfirm, setOpenApplyConfirm] = useState(false);
  const handleApplyButton = useCallback(() => {
    setOpenApplyConfirm(true);
  }, [setOpenApplyConfirm]);

  // const handleApply = useCallback(() => {
  //   showToast(`적용이 완료되었습니다.`, `success`);
  //   setOpenApplyConfirm(false);
  // }, [setOpenApplyConfirm, showToast]);

  //다이알로그 페이지 1
  const [insertConfirm, setInsertConfirm] = useState(false);
  const handleOpenPopUp = useCallback(() => {
    setInsertConfirm(true);
  }, [setInsertConfirm]);
  const { register, handleSubmit } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const onSubmit = useCallback(
    (data) => {
      showToast(
        "퀴즈그룹이 등록이 완료되었습니다.",
        `success`
      );
      setInsertConfirm(false);
    },
    [showToast, setInsertConfirm]
  );
  const onInvalid = (errors) => console.log(errors);  

  //다이알로그 페이지 2
  const [isGroupContent, setGroupContent] = useState(false);
  const handleOpenGroupContent = useCallback(() => {
    setGroupContent(true);
  }, [setGroupContent]);

  //다이알로그 페이지 3
//   const [isQuzContent, setQuzContent] = useState(false);
//   const handleOpensetQuzContent = useCallback(() => {
//     setQuzContent(true);
//   }, [setQuzContent]);

  const [imgBase64, setImgBase64] = useState([]);
  const [imgFile, setImgFile] = useState(null);

  const handleClickFile = (e) => { // button 클릭으로 file파일 클릭 핸들러
    e.target.previousElementSibling.previousElementSibling.click();
  }

  const handleChangeFile = (e) => {
    setImgFile(e.target.files);
    setImgBase64([]);

    if (e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          var base64Sub = base64.toString();
          setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          e.target.nextElementSibling.value = e.target.files[0].name; // input에 파일 이름 노출
        }
      };
    }
  };


  const handleResetFile = (e) => { // 파일 이미지 삭제
    setImgBase64((imgBase64) => []);
    e.target.parentNode.parentNode.parentNode.nextElementSibling.childNodes[0].value = "";
    e.target.parentNode.parentNode.parentNode.nextElementSibling.childNodes[1].value = "";
  };


  return (
    <>
      <div className="layout_wrap">
        
        {/* 카테고리 */}
        <div className="layout_item wt-pc30">
          <div className="cpnt_tree">
            <h2 className="title">카테고리</h2>
            <ul className="tree-default">
              <li className="root">
                <button type="button"><DriveFolderUploadIcon /> <span>전체(100000)</span></button>
                <ul>
                  <li className="hasChild">
                    <button type="button"><DriveFolderUploadIcon /> <span>과학(100001)</span></button>
                    <ul>
                      <li className="hasChild">
                        <button type="button"><DriveFolderUploadIcon /><span>동물(100006)</span></button>
                        <ul>
                          <li><button type="button"><FolderIcon /> <span>다양한 동물(100013)</span></button></li>
                          <li><button type="button"><FolderIcon /> <span>반려동물(100014)</span></button></li>
                          <li><button type="button"><FolderIcon /> <span>공룡(100014)</span></button></li>
                        </ul>
                      </li>
                      <li><button type="button"><span><FolderIcon /> 식물(100007)</span></button></li>
                      <li><button type="button"><span><FolderIcon /> 첨단과학과 태양계(100008)</span></button></li>
                      <li><button type="button"><span><FolderIcon /> 신체와 건강(100009)</span></button></li>
                      <li><button type="button"><span><FolderIcon /> 스포츠(100010)</span></button></li>
                    </ul>
                  </li>
                  <li><button type="button"><span><CreateNewFolderIcon /> 수학(100002)</span></button></li>
                  <li><button type="button"><span><CreateNewFolderIcon /> 사회(100003)</span></button></li>
                  <li><button type="button"><span><CreateNewFolderIcon /> 예술(100004)</span></button></li>
                  <li><button type="button"><span><CreateNewFolderIcon /> 영어(100005)</span></button></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        {/* 리스트 */}
        <div className="layout_item wt-pc70 pd20">
          <div className="cpnt_table">
            <table className="table-default">
              <caption>
                <strong className="title dp-blind">퀴즈백과 퀴즈그룹 관리 리스트</strong>
                <span className="total">
                  {`Total: `}
                  <b>3</b>
                </span>
              </caption>
              <thead>
                <tr>
                  <th><input name="checkAll" type={"checkbox"} /></th>
                  <th>퀴즈 그룹 번호</th>
                  <th>
                    <TooltipText title="클릭 시 등록된 '퀴즈그룹 상세'를 확인 하실 수 잇습니다.">퀴즈그룹 명</TooltipText>
                  </th>
                  <th>퀴즈그룹 문항 수</th>
                  <th>상용 노출 여부</th>
                  <th>편성 현황</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                      <td><input type={"checkbox"} /></td>
                      <td>200006</td>
                      <td>퀴즈그룹6</td>
                      <td>50</td>
                      <td>
                        <div className="field-wrap cid-center">
                          <input type="radio" name="expose1" id="expose11" required defaultChecked /><label htmlFor="expose11">비노출</label>
                          <input type="radio" name="expose1" id="expose12" required /><label htmlFor="expose12">검수</label>
                          <input type="radio" name="expose1" id="expose13" required /><label htmlFor="expose13">비노출</label>
                        </div>
                      </td>
                      <td>
                        <TooltipBox title={
                          <div className="cpnt_tooltip_inner">
                            <strong>[편성 현황]</strong>
                            <p>과학 &#62; 동물</p>
                            <p>과학 &#62; 동물 &#62; 다양한 동물</p>
                            <p>수학 &#62; 숫자와 도형 &#62; 구구단</p>
                          </div>
                        }>
                          <button className="field-button list" type="button"> <VisibilityIcon /> 편성 리스트</button>
                        </TooltipBox>
                      </td>
                  </tr>
                  <tr>
                  <td><input type={"checkbox"} /></td>
                      <td>200005</td>
                      <td>퀴즈그룹5</td>
                      <td>100</td>
                      <td>
                        <div className="field-wrap cid-center">
                          <input type="radio" name="expose2" id="expose21" required defaultChecked /><label htmlFor="expose21">비노출</label>
                          <input type="radio" name="expose2" id="expose22" required /><label htmlFor="expose22">검수</label>
                          <input type="radio" name="expose2" id="expose23" required /><label htmlFor="expose23">비노출</label>
                        </div>                  
                      </td>
                      <td>
                        <TooltipBox title={
                          <div className="cpnt_tooltip_inner">
                            <strong>[편성 현황]</strong>
                            <p>편성 정보가 없습니다.</p>
                          </div>
                        }>
                          <button className="field-button list" type="button"> <VisibilityIcon /> 편성 리스트</button>
                        </TooltipBox>
                      </td>
                  </tr>
                  <tr>
                      <td><input type={"checkbox"} /></td>
                      <td>200004</td>
                      <td>퀴즈그룹4</td>
                      <td>230</td>
                      <td>
                        <div className="field-wrap cid-center">
                          <input type="radio" name="expose3" id="expose31" required defaultChecked /><label htmlFor="expose31">비노출</label>
                          <input type="radio" name="expose3" id="expose32" required /><label htmlFor="expose32">검수</label>
                          <input type="radio" name="expose3" id="expose33" required /><label htmlFor="expose33">비노출</label>
                        </div>                  
                      </td>
                      <td>
                        <TooltipBox title={
                          <div className="cpnt_tooltip_inner">
                            <strong>[편성 현황]</strong>
                            <p>편성 정보가 없습니다.</p>
                          </div>
                        }>
                          <button className="field-button list" type="button"> <VisibilityIcon /> 편성 리스트</button>
                        </TooltipBox>
                      </td>
                    
                  </tr>
              </tbody>
            </table>


            <div className="cpnt_btns">
              <button type="button" onClick={handleDeleteButton}>
                <DeleteOutlineIcon /> 삭제
              </button>
              <button type="button" onClick={handleApplyButton}>
                <SimCardDownloadIcon /> 엑셀 다운로드
              </button>
              <button type="button" className="sb af-r" onClick={handleOpenPopUp}>
                <AddIcon /> 퀴즈그룹 등록
              </button>
            </div>
          </div>
        </div>

      </div>


      <ConfirmDialog
        open={isOpenDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        onConfirm={handleDeleteButton}
      >
        <p>
          {`삭제하시겠습니까?`}
          <br />
          {`삭제 후 복구가 불가능합니다.`}
        </p>
      </ConfirmDialog>      
      
    </>
  );
};

export default QuzCategory;
