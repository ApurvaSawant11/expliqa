import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPosts } from "features/home/postSlice";
import { followUnFollowUser } from "./userSlice.js";
import { getUserQuestions } from "features/home/questionSlice";
import {
  AnswerCard,
  EditProfileModal,
  FollowBar,
  PostCard,
  QuestionCard,
} from "components/index.js";
import { FollowIcon, PostIcon, ProfileIcon, UnfollowIcon } from "assets";
import { updateUserDetails } from "features/auth/authSlice.js";

const UserProfile = () => {
  const checkActive = (index, className) =>
    activeIndex === index ? className : "border-b-2 border-gray-300";
  const [activeIndex, setActiveIndex] = useState(1);
  const dispatch = useDispatch();
  const { userHandle } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { allUsers } = useSelector((state) => state.user);
  const [selectedUser, setSingleUser] = useState({});
  const { userPosts, allPosts } = useSelector((state) => state.post);
  const { userQuestions, allQuestions } = useSelector(
    (state) => state.question
  );
  const [userAnswers, setUserAnswers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    setSingleUser(allUsers.find((user) => user.userHandle === userHandle));
    setUserAnswers(
      allQuestions.filter((question) =>
        question.answers.find(
          (answer) => answer.username === selectedUser.username
        )
      )
    );
  }, [allUsers, userHandle]);

  useEffect(() => {
    dispatch(getUserPosts(selectedUser?.username));
    dispatch(getUserQuestions(selectedUser?.username));
  }, [selectedUser, allPosts, allQuestions]);

  useEffect(() => {
    user.userHandle === userHandle && setSingleUser(user);
  }, [user]);

  const isFollowing = selectedUser?.followers?.some(
    (follower) => follower.username === user.username
  );

  return selectedUser?.username ? (
    <div className="min-h-screen py-12 w-11/12 xs:w-4/5 md:w-11/12 lg:w-4/5 xl:w-3/5 m-auto flex">
      <div className="bg-white h-max">
        <div className="flex items-start p-4 rounded-md gap-4 flex-wrap">
          <img
            src={selectedUser.profilePic}
            className="h-24 w-24 rounded-full object-cover"
          />
          <div className="grow">
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-xl sm:text-3xl font-bold mr-2 cursor-pointer">{`${selectedUser.firstName} ${selectedUser.lastName}`}</p>
                <p className="text-sm text-gray-400 cursor-pointer">
                  @{selectedUser.userHandle}
                </p>
              </div>
              {userHandle === user.userHandle ? (
                <button
                  className="font-semibold bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 h-max"
                  onClick={() => setShowEditModal(true)}
                >
                  <div className="flex items-center gap-2">
                    <PostIcon size={14} /> Edit
                  </div>
                </button>
              ) : (
                <button
                  className="font-semibold bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 h-max"
                  onClick={() =>
                    dispatch(
                      followUnFollowUser({
                        userId: selectedUser._id,
                        dispatch: dispatch,
                        isFollow: isFollowing ? false : true,
                      })
                    )
                  }
                >
                  {!isFollowing ? (
                    <div className="flex items-center gap-1">
                      <FollowIcon size={20} /> Follow
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <UnfollowIcon size={20} /> Unfollow
                    </div>
                  )}
                </button>
              )}
            </div>

            <div className="flex text-gray-500 font-semibold gap-8 mb-2 ">
              <span>{selectedUser.followers.length} Followers</span>
              <span>{selectedUser.following.length} Following</span>
            </div>
            <div className="text-gray-500 text-sm font-semibold flex gap-4">
              <div>
                <a
                  href={selectedUser.link}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                >
                  {selectedUser.link}
                </a>
              </div>
            </div>
          </div>
          <p className="text-gray-500 font-semibold mb-2  w-full">
            {selectedUser.bio}
          </p>
          <div className="flex w-full">
            <button
              className={`pb-2 basis-full ${checkActive(
                1,
                "border-b-[3px] border-green-500 font-semibold"
              )}`}
              onClick={() => setActiveIndex(1)}
            >
              {userPosts.length} Posts
            </button>
            <button
              className={`pb-2 basis-full ${checkActive(
                2,
                "border-b-[3px] border-green-500 font-semibold"
              )}`}
              onClick={() => setActiveIndex(2)}
            >
              {userQuestions.length} Questions
            </button>
            <button
              className={`pb-2 basis-full ${checkActive(
                3,
                "border-b-[3px] border-green-500 font-semibold"
              )}`}
              onClick={() => setActiveIndex(3)}
            >
              {userAnswers.length} Answers
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {activeIndex === 1
            ? userPosts.map((post) => <PostCard key={post._id} post={post} />)
            : activeIndex === 2
            ? userQuestions.map((question) => (
                <QuestionCard key={question._id} question={question} />
              ))
            : userAnswers.map((question) => (
                <AnswerCard
                  key={question._id}
                  question={question}
                  answerUser={selectedUser}
                />
              ))}
        </div>
      </div>

      {showEditModal && (
        <EditProfileModal setShowEditModal={setShowEditModal} />
      )}

      <FollowBar />
    </div>
  ) : (
    <></>
  );
};

export { UserProfile };