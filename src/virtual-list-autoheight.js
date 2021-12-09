import React, { useState, useRef, useEffect } from "react";
import { Button } from "antd";
import "./index.css";

const datasource = new Array(10000).fill(1).map((item, idx) => idx);
const Test = () => {
  const [visible, setVisible] = useState(true);
  const [dataSlice, setDataSlice] = useState([]); //数据切片
  const [itemHeight, setItemHeight] = useState(40); //单行item高度
  const [scrollDis, setScrollDis] = useState(0);
  const refContainer = useRef();
  const refVirtualContainer = useRef();
  const refItem = useRef();

  useEffect(() => {
    if (!visible) return;
    //设置虚拟容器高度
    const containerHeight = itemHeight * datasource.length * 2;
    refVirtualContainer.current.style.height = containerHeight + "px";
    //设置可视区域数据
    let refContainerHeight = refContainer.current.clientHeight;
    const num = Math.ceil(refContainerHeight / itemHeight);
    setDataSlice(datasource.slice(0, num));

    let timer = null;
    const delay = 50;
    let startTime = Date.now();
    refContainer.current.addEventListener("scroll", (e) => {
      let curTime = Date.now();
      let remaining = delay - (curTime - startTime);
      if (timer) clearTimeout(timer);
      // 设置第一次滚动时触发方法
      if (remaining <= 0) {
        startTime = Date.now();
        setData(e.target.scrollTop, refContainerHeight, containerHeight);
      } else {
        timer = setTimeout(() => {
          setData(e.target.scrollTop, refContainerHeight, containerHeight);
          timer = null;
        }, delay);
      }
    });
  }, [itemHeight, visible]);

  const setData = (scrollTop, refContainerHeight, containerHeight) => {
    setDataSlice(
      datasource.slice(
        Math.ceil((scrollTop / containerHeight) * datasource.length),
        Math.ceil(
          ((scrollTop + refContainerHeight * 2) / containerHeight) *
            datasource.length
        )
      )
    );
    setScrollDis(scrollTop);
  };

  const visbileClick = () => {
    setVisible((vis) => !vis);
    setDataSlice([]);
    setScrollDis(0);
  };

  return (
    <div>
      <div onClick={visbileClick}>virtualListAutoHeight</div>
      {visible ? (
        <div ref={refContainer} className="container">
          <div className="virtual-container" ref={refVirtualContainer}>
            <div
              className="virtual"
              style={{ transform: `translateY(${scrollDis}px)` }}
            >
              {dataSlice.map((item, idx) => (
                <div className="item">
                  <div
                    key={idx}
                    ref={refItem}
                    style={{
                      height: itemHeight,
                      lineHeight: `${itemHeight}px`,
                    }}
                  >
                    <Button>{item * 80}</Button>
                  </div>
                  {Math.round(Math.random()) ? (
                    <Button>{item * 80}</Button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Test;
