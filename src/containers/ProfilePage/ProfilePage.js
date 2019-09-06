import React, { Component } from "react";
import Photo from "../../assets/images/news/news.png";
import ProfilePhoto from "../../assets/images/profile/profile.png";
import NewsItems from "../../components/NewsItems/NewsItems";
import ProfileCard from "../../components/Profile/ProfileCard/ProfileCard";
import Grid from "../../components/Grid/Grid";
export class ProfilePage extends Component {
  state = {
    profile: {
      photo: ProfilePhoto,
      name: "Томас Эдисон",
      position: ["изобретатель и предприниматель", "Inventor and entrepreneur"],
      artCount: 3
    },
    articles: [
      {
        id: 0,
        image: Photo,
        title: "Community - Blockchain.io Ambassador Program",
        date: "31 August 2019",
        views: 27,
        comments: 27,
        catId: 1
      },
      {
        id: 1,
        image: Photo,
        title: "Community",
        date: "30 August 2019",
        views: 26,
        comments: 28,
        catId: 2
      },
      {
        id: 2,
        image: Photo,
        title: "Blockchain.io",
        date: "29 August 2019",
        views: 25,
        comments: 29,
        catId: 1
      },
      {
        id: 3,
        image: Photo,
        title: "Ambassador",
        date: "28 August 2019",
        views: 24,
        comments: 30,
        catId: 1
      }
    ],
    lang: 0
  };

  componentDidMount() {}
  articleHandler = (event, id) => {
		event.preventDefault();
    this.props.history.push(`/articles/${id}`);
    window.scrollTo({ top: "0" });
	};
  render() {
    return (
      <>
        <Grid item xs={12} mt="true">
          <Grid container con="true" spacing={5}>
            <Grid item sm={5} md={3} xs={12}>
              <ProfileCard
                lang={this.state.lang}
                profile={this.state.profile}
              ></ProfileCard>
            </Grid>
            <Grid item md={8} sm={7} xs={12}>
              <NewsItems articleClicked={this.articleHandler} news={this.state.articles} wide></NewsItems>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default ProfilePage;
