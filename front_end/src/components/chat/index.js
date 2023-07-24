import React, { useEffect, useRef, useState } from "react";
import {
  Affix,
  Avatar,
  Col,
  Dropdown,
  Empty,
  FloatButton,
  Input,
  Row,
  Spin,
} from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import ramdomstring from "randomstring";

import { BsFillChatRightTextFill, BsArrowBarRight } from "react-icons/bs";
import {
  AiOutlineDownSquare,
  AiOutlineDown,
  AiOutlineSend,
  AiOutlineUser,
} from "react-icons/ai";

import { typeMessage } from "../../utils/type";
import { socket } from "../../service/socket";
import { get } from "../../service/axios/instance";

import styles from "./chat.module.scss";
import { getInformation } from "../../service/cookie/JWT";

const { Search } = Input;

const ChatComponent = () => {
  const { infoChat } = useSelector((state) => state.messageInfo);
  const { _id } = getInformation();

  const [iconChat, setIconChat] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [message, setMessage] = useState([]);
  const [arrayUser, setArrayUser] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const [highlight, setHighlight] = useState("");
  const boxChatRef = useRef(null);

  //received message
  useEffect(() => {
    socket.on("received", (data) => {
      console.log(data);
      const existUser = arrayUser.findIndex((user) => user.id === data.id);
      if (existUser === -1) {
        setArrayUser([
          ...arrayUser,
          {
            id: data.from,
            user: {
              username: data.username,
              avatarUrl: data.avatarUrl,
            },
            roomId: data.roomId,
          },
        ]);
      }
      get(`get_message/${data.from}`)
        .then((data) => {
          setMessage(data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return () => {
      socket.off("received");
    };
  }, []);

  useEffect(() => {
    if (Object.keys(infoChat).length > 0) {
      const exist = arrayUser.findIndex((item) => item._id === infoChat.id);
      if (exist === -1) {
        setArrayUser([...arrayUser, infoChat]);
      }
    }
  }, [infoChat]);

  useEffect(() => {
    console.log("scrroll");
    scrollViewBottom();
  }, [message]);

  const scrollViewBottom = () => {
    boxChatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //send message
  const handleSendChat = (e) => {
    socket.emit("sendMessage", {
      to: highlight.id,
      message: e.target.value,
      roomId: highlight.roomId,
      from: _id,
      username: highlight.user.username,
      avartarUrl: highlight.user.avatarUrl,
      id: ramdomstring.generate(),
      createdAt: moment().format(),
    });

    setMessage([
      ...message,
      {
        from: _id,
        to: highlight.id,
        roomId: highlight.roomId,
        message: e.target.value,
        createdAt: moment().format(),
        _id: ramdomstring.generate(),
      },
    ]);
    setValueInput("");
  };

  const handleRoomChat = (room) => {
    const selectItem = arrayUser.find(
      (item) => item.roomId === room.roomId && item.id === room.id
    );
    setHighlight(selectItem);
    if (highlight.id !== room.id) {
      get(`get_message/${room.id}`)
        .then((data) => {
          setMessage(data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };

  return iconChat ? (
    <Affix offsetBottom={0}>
      <Row justify="end">
        <div className={styles.containerChat}>
          <Row
            className={styles.headerChat}
            justify="space-between"
            align="middle"
          >
            <Col>
              <h2 className={styles.titleChat}>Chat</h2>
            </Col>
            <Col>
              <BsArrowBarRight className={styles.icon} />
              <AiOutlineDownSquare className={styles.icon} />
            </Col>
          </Row>

          <Row className={styles.boxChatContainer}>
            <Col xxl={9} className={styles.contentChat}>
              <div className={styles.headerLeftContentChat}>
                <Search placeholder="Tìm kiếm" allowClear />
              </div>
              {arrayUser?.map((item) => (
                <Row
                  key={item?.roomId}
                  align="middle"
                  justify="space-between"
                  className={styles.chatBox}
                  style={{
                    backgroundColor:
                      item.roomId === highlight.roomId
                        ? "rgba(0,0,0,.08)"
                        : "none",
                  }}
                  onClick={() => handleRoomChat(item)}
                >
                  <Col xxl={5}>
                    {item?.user?.linkAvatar ? (
                      <Avatar size={40} src={item.user.linkAvatar} />
                    ) : (
                      <Avatar size={40} icon={<AiOutlineUser />} />
                    )}
                  </Col>
                  <Col xxl={19}>
                    <Row justify="space-between" align="middle">
                      <div className={styles.nameChat}>
                        {item?.user?.username}
                      </div>
                      <span className={styles.timeChat}>
                        {item?.createdAt
                          ? moment(item?.createdAt).fromNow()
                          : ""}
                      </span>
                    </Row>
                    <div className={styles.contentChatbox}>
                      {item?.message || ""}
                    </div>
                  </Col>
                </Row>
              ))}
            </Col>
            {highlight ? (
              <Col xxl={15} className={styles.textChatBox}>
                <div className={styles.headerRightChatBox}>
                  <span className={styles.chatUserName}>
                    {highlight?.user?.username}
                  </span>
                </div>

                {loadingChat ? (
                  <Spin
                    style={{
                      height: "75%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                    tip="Loading"
                  />
                ) : (
                  <div className={styles.contentTextChatBox}>
                    {message?.length > 0 ? (
                      message?.map((mess) => {
                        if (mess.from === _id) {
                          return (
                            <p key={mess._id} className={styles.fromChat}>
                              {mess.message}
                            </p>
                          );
                        } else {
                          return (
                            <p key={mess._id} className={styles.toChat}>
                              {mess.message}
                            </p>
                          );
                        }
                      })
                    ) : (
                      <Empty />
                    )}
                    <div ref={boxChatRef} />
                  </div>
                )}

                <Row
                  className={styles.inputChatBox}
                  align="middle"
                  justify="space-between"
                >
                  <Input
                    className={styles.inputChat}
                    placeholder="Nhập đoạn chat của bạn"
                    onPressEnter={handleSendChat}
                    onChange={(e) => setValueInput(e.target.value)}
                    value={valueInput}
                  />
                  <AiOutlineSend className={styles.iconSend} />
                </Row>
              </Col>
            ) : (
              <Col xxl={15}>
                <Empty />
              </Col>
            )}
          </Row>
        </div>
      </Row>
    </Affix>
  ) : (
    <FloatButton
      icon={<BsFillChatRightTextFill />}
      badge={{
        count: 0,
      }}
      onClick={() => setIconChat(true)}
    />
  );
};

export default ChatComponent;
