import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css"; // ✅ 다크 모드 아닌 기본 CSS만 import
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

export default function WriteAuthPage() {
    const { type } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef();
    const [title, setTitle] = useState("");
    const [previewImage, setPreviewImage] = useState(null); // 🖼️ 이미지 미리보기용 상태

    const boardNames = {
        free: "자유게시판",
        qna: "질문 게시판",
        tips: "팁 게시판",
    };

    const boardName = boardNames[type] || "게시판";

    const handleUpload = () => {
        try {
            const content = editorRef.current.getInstance().getMarkdown();

            if (!title.trim() || !content.trim()) {
                alert("제목과 내용을 모두 입력해주세요!");
                return;
            }

        // TODO: 여기에 axios.post() 등 업로드 로직 작성
            console.log("제목:", title);
            console.log("내용:", content);

            alert("게시물 업로드 완료!");
            navigate(`/board/${type}`);
        } catch (error) {
            console.error("업로드 중 오류 발생:", error);
            alert("업로드에 실패했습니다.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        
        {/* 카테고리 */}
        <div className="mb-4 text-sm text-gray-500">{boardName}</div>

        {/* 제목 입력 */}
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full p-4 text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        />

        {/* Toast UI 에디터 */}
        <div className="mt-6">
        <Editor
            ref={editorRef}
            height="400px"
            initialEditType="wysiwyg"
            previewStyle="vertical"
            autofocus={true}
            plugins={[colorSyntax]}
            placeholder="내용을 입력해주세요. 마크다운을 자유롭게 활용할 수 있어요!"
            hideModeSwitch={true}
            toolbarItems={[
                ["bold", "italic", "strike"],
                ["hr", "quote"],
                ["ul", "ol"],
                ["image", "link"],
                ["codeblock"],
            ]}
        />
        </div>

        {/* 업로드 버튼 */}
        <div className="flex justify-end">
            <button
                onClick={handleUpload}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-bold transition">
            업로드
            </button>
        </div>
    </div>
    );
}