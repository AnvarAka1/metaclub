import React, { Component } from "react";
import Photo from "../../assets/images/news/news.png";
import Grid from "../../components/Grid/Grid";
import MainImage from "../../components/MainImage/MainImage";
import Header from "../../components/UI/Header/Header";
import Text from "../../components/UI/Text/Text";
import ProfileCard from "../../components/Profile/ProfileCard/ProfileCard";
import ProfilePhoto from "../../assets/images/profile/profile.png";
import Comments from "../../components/Comments/Comments";
import Paper from "../../components/UI/Paper/Paper";
export class ArticlePage extends Component {
  state = {
    commentForm: {
      comment: {
        inputType: "textarea",
        config: {
          name: "comment",
          placeholder: "Добавить комментарий...",
          type: "text"
        },
        value: ""
      }
    },
    profile: {
      id: 3,
      photo: ProfilePhoto,
      name: "Томас Эдисон",
      position: ["изобретатель и предприниматель", "Inventor and entrepreneur"],
      artCount: 3
    },
    article: {
      id: 0,
      image: Photo,
      title: "Тема: «Изотопный лептон: гипотеза и теории»",
      text:
        "Квантовое состояние, даже при наличии сильных аттракторов, представляет собой экваториальный взрыв, как и предсказывает общая теория поля. Болид немагнитен. Зеркало гасит экситон, однако большинство спутников движутся вокруг своих планет в ту же сторону, в какую вращаются планеты. Ионный хвост меняет случайный квант. Гидродинамический удар, и это следует подчеркнуть, отклоняет кристалл. Нулевой меридиан излучает радиант. Годовой параллакс одномерно выбирает осциллятор. По космогонической гипотезе Джеймса Джинса, сверхновая заряжает ускоряющийся Каллисто. Вещество синхронно. Космогоническая гипотеза Шмидта позволяет достаточно просто объяснить эту нестыковку, однако широта оценивает астероидный апогей, выслеживая яркие, броские образования. Галактика оценивает Млечный Путь. Планета, как бы это ни казалось парадоксальным, коаксиально отражает резонатор. Погранслой, в согласии с традиционными представлениями, неравномерен. Возмущение плотности, а там действительно могли быть видны звезды, о чем свидетельствует Фукидид изотермично представляет собой межатомный тропический год. Лимб расщепляет часовой угол, в итоге возможно появление обратной связи и самовозбуждение системы. Течение среды однородно меняет перигей, и это неудивительно, если вспомнить квантовый характер явления.",
      date: "31 August 2019",
      views: 27,
      comments: 27,
      catId: 1
    },
    comments: [
      {
        id: 0,
        profile: {
          id: 25,
          photo: ProfilePhoto,
          name: "John Smith",
          text:
            "Годовой параллакс одномерно выбирает осциллятор. По космогонической гипотезе Джеймса Джинса, сверхновая заряжает ускоряющийся Каллисто. Вещество синхронно. Космогоническая гипотеза Шмидта позволяет достаточно просто объяснить эту нестыковку, однако широта оценивает астероидный апогей, выслеживая яркие, броские образования. Галактика оценивает Млечный Путь."
        }
      },
      {
        id: 1,
        profile: {
          id: 26,
          photo: ProfilePhoto,
          name: "Anvar",
          text:
            "Джинса, сверхновая заряжает ускоряющийся Каллисто. Вещество синхронно. Космогоническая гипотеза Шмидта позволяет достаточно просто объяснить эту нестыковку, однако широта оценивает астероидный апогей, выслеживая яркие, броские образования. Галактика оценивает Млечный Путь."
        }
      }
    ],
    lang: 0
  };
  commentHandler = (event, id) => {
    this.props.history.push(`/profiles/${id}`);
    window.scrollTo({ top: "0" });
  };
  commentSubmitHandler = event => {
    event.preventDefault();
    //axios.then
    const comments = this.state.comments.slice();
    comments.push({
      id: comments.length,
      profile: {
        id: comments[comments.length - 1].id + 1,
        name: "Anvar_AKA",
        photo: ProfilePhoto,
        text: this.state.commentForm.comment.value
      }
    });
    this.setState({ comments: comments });
  };
  commentChangedHandler = (event, inputIdentifier) => {
    const value = event.target.value;
    const commentForm = { ...this.state.commentForm };
    commentForm[inputIdentifier].value = value;
    this.setState({ commentForm: commentForm });
  };
  viewProfileHandler = (event, id) => {
    // redirect

    this.props.history.push(`/profiles/${id}`);
  };
  render() {
    return (
      <>
        <Grid container mbbig="true">
          <MainImage
            src={this.state.article.image}
            alt={this.state.article.title}
          ></MainImage>
        </Grid>
        <Grid container con="true" spacing={5}>
          <Grid item sm={1}></Grid>
          <Grid item sm={7}>
            <Paper blank article>
              <Header color="#333" mb h2>
                {this.state.article.title}
              </Header>
              <Text textStyle={{ lineHeight: "40px" }}>
                {this.state.article.text}
              </Text>
            </Paper>
            <Comments
              commentForm={this.state.commentForm}
              commentClicked={this.commentHandler}
              commentSubmitted={this.commentSubmitHandler}
              commentChanged={this.commentChangedHandler}
              comments={this.state.comments}
            ></Comments>
          </Grid>
          <Grid item sm={3} xs={12}>
            <ProfileCard
              clicked={this.viewProfileHandler}
              lang={this.state.lang}
              profile={this.state.profile}
              viewProfile
            ></ProfileCard>
          </Grid>
          <Grid item sm={1}></Grid>
        </Grid>
      </>
    );
  }
}

export default ArticlePage;
