import React, { useState, useEffect, useRef, CSSProperties } from "react";
interface MoveWidthwiseProps {
    /**
     * @description 'displayed' - 要以橫向捲軸呈現的內容元件
     */
    contentComponent: JSX.Element;
    contentHeight?: string /* 因應 100vh 的寫法 */;
}

const MoveWidthwise = ({
    contentComponent,
    contentHeight,
}: MoveWidthwiseProps) => {
    /**
     * @description container - 滾輪上下移動的偵測空間
     */
    const VerticalRail = useRef<HTMLDivElement>(null);
    /**
     * @description 'displayedWrapper' - 橫向捲軸內容元件的容器
     */
    const horizontalRail = useRef<HTMLDivElement>(null);

    //* 設定 VerticalRail 高度
    /**
     * @type {string}
     * @description 'containerHeight' - 捲動區塊的高度
     */
    const initialHeight: string = "0px";
    const [height__vRail, setHeight__vRail] = useState(initialHeight);

    useEffect(() => {
        console.log("內容所需寬度：" + horizontalRail.current!.offsetWidth);
        // Case I : 預設值以 content 的寬度為基準，轉換為以全螢幕高度的基準
        if (!contentHeight) {
            setHeight__vRail(
                `${
                    (window.innerHeight * horizontalRail.current!.offsetWidth) /
                    window.innerWidth
                }px`
            );
        } else {
            /* Case II : 有指定高度 */
            setHeight__vRail(contentHeight);
        }

        setWidth__hRail(horizontalRail.current!.offsetWidth);
    }, [contentHeight]);

    //* 設定 progress
    /**
     * @type {number}
     * @description 'wrapperwidth' - 捲動區塊的高度
     */
    const initialWidth: number = 0;
    const [width__hRail, setWidth__hRail] = useState<number>(initialWidth);
    /**
     * @type {number}
     * @description
     * - 進度條的百分比: 0~100 時才會讓橫向捲軸作用
     * - 更新機制於 {@link updateProgress | updateProgress( )}
     */
    const initialProgress: number = 0;
    const [progress, setProgress] = useState(initialProgress);
    /**
     * @description 由於捲軸區塊未必在座標的最上面，此在計算區塊的頂點位置
     */
    const updateProgress = () => {
        console.log("updateProgress : 我被啟動了");

        const { scrollTop } = document.documentElement;
        /**
         * @description 'containerTop'
         */
        const railTop = VerticalRail.current!.offsetTop;
        /**
         * @description 'containerHeightNumber'
         */
        const HeightNum__vRail = VerticalRail.current!.offsetHeight;

        const newProgress =
            ((scrollTop - railTop) * 100) /
            (HeightNum__vRail - window.innerHeight);
        // (目前螢幕的頂點 - container頂點) / (container高度 - 一個螢幕高)
        setProgress(newProgress);
    };
    useEffect(() => {
        updateProgress();
        addEventListener("scroll", updateProgress);
        return () => {
            removeEventListener("scroll", updateProgress);
        };
    }, []);

    //* 整合樣式
    const handleTransform = (): string => {
        /**
         * @description 內容方塊可移動的百分比，NOT 100%
         * */
        let percentage: number;
        if (progress < 0) percentage = 0;
        else {
            if (progress > 100)
                percentage =
                    (100 * (width__hRail - window.innerWidth)) / width__hRail;
            else
                percentage =
                    (progress * (width__hRail - window.innerWidth)) /
                    width__hRail;
        }
        return `translateX(-${percentage}%)`;
    };
    /**
     * @description 以 progress 決定 position
     * @returns ('static' | 'fixed' | 'absolute')
     * @comment 由於 position 在 TS 的型態並非單純的 string
     *  而是限制選項的自定義型態，因此本函數的型態宣告如是為之
     */
    const handlePosition = (): "static" | "fixed" | "absolute" => {
        console.log("Now the progress is: " + progress);

        if (progress < 0) return "static";
        else if (progress <= 100) return "fixed";
        else return "absolute";
    };
    //         0          100
    // --------|-----------|----------> progress
    //  static     fixed     absolute at bottom 0
    const style__horizontalRail: CSSProperties = {
        height: "100vh",
        transform: handleTransform(),
        position: handlePosition(),
        bottom: 0,
    };

    return (
        <div
            style={{
                display: "inline-block",
                verticalAlign: 'top',
                height: height__vRail,
                backgroundColor: "lightgreen",
                position: "relative",
                width: "100vw",
                overflow: "hidden",
            }}
            ref={VerticalRail}
        >
            <div style={style__horizontalRail} ref={horizontalRail}>
                {contentComponent}
            </div>
        </div>
    );
};

export default MoveWidthwise;
