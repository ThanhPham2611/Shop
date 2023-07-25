import React, { useEffect, useRef, useState } from "react";
import {
  Affix,
  Avatar,
  Col,
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
  AiOutlineSend,
  AiOutlineUser,
} from "react-icons/ai";

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

  useEffect(() => {
    get('room_message')
      .then(data => {
        setArrayUser(data.arrayChat);
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  //received message
  useEffect(() => {
    socket.on("received", (data) => {
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
      setIconChat(true);
      if (highlight?.user?._id !== infoChat?.user?._id) {
        const exist = arrayUser.find((item) => item?.user?._id === infoChat?.user?._id);
        if (!exist) {
          setArrayUser([...arrayUser, infoChat]);
        } else {
          setHighlight(exist);
        }
        get(`get_message/${infoChat.user?._id}`)
          .then((data) => {
            setMessage(data.message);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return
      }

    }
  }, [infoChat]);

  useEffect(() => {
    scrollViewBottom();
  }, [message]);

  const scrollViewBottom = () => {
    boxChatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //send message
  const handleSendChat = (e) => {
    socket.emit("sendMessage", {
      to: highlight.user._id,
      message: e?.target?.value || e,
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
        to: highlight.user._id,
        roomId: highlight.roomId,
        message: e?.target?.value || e,
        createdAt: moment().format(),
        _id: ramdomstring.generate(),
      },
    ]);

    const updateArrayUser = arrayUser?.map(item => {
      if (item.user._id === highlight.user._id) {
        return { ...item, message: e?.target?.value || e };
      }
      return item;
    })

    setArrayUser(updateArrayUser);
    setValueInput("");
  };

  const handleRoomChat = (room) => {
    const selectItem = arrayUser.find(
      (item) => item.roomId === room.roomId
    );
    setHighlight(selectItem);
    if (highlight?.user?._id !== room?.user?._id) {
      get(`get_message/${room?.user?._id}`)
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
              <AiOutlineDownSquare className={styles.icon} onClick={() => setIconChat(false)} />
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
                        : "transparent",
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
                            <Row className={styles.fromChat} align='middle'>
                              <span className={styles.time}>11:02</span>
                              <p key={mess._id} className={styles.text}>
                                {mess.message}
                              </p>
                            </Row>
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
                  <AiOutlineSend className={styles.iconSend} onClick={() => handleSendChat(valueInput)} />
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
