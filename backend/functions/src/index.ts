import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

// ---------------------------------------------------------------------------
// Likes
// ---------------------------------------------------------------------------

export const addLike = functions.firestore
  .document('/posts/{creatorId}/userPosts/{postId}/likes/{userId}')
  .onCreate(
    (
      _snap: functions.firestore.QueryDocumentSnapshot,
      context: functions.EventContext
    ): Promise<FirebaseFirestore.WriteResult> => {
      return db
        .collection('posts')
        .doc(context.params.creatorId)
        .collection('userPosts')
        .doc(context.params.postId)
        .update({
          likesCount: admin.firestore.FieldValue.increment(1),
        });
    }
  );

export const removeLike = functions.firestore
  .document('/posts/{creatorId}/userPosts/{postId}/likes/{userId}')
  .onDelete(
    (
      _snap: functions.firestore.QueryDocumentSnapshot,
      context: functions.EventContext
    ): Promise<FirebaseFirestore.WriteResult> => {
      return db
        .collection('posts')
        .doc(context.params.creatorId)
        .collection('userPosts')
        .doc(context.params.postId)
        .update({
          likesCount: admin.firestore.FieldValue.increment(-1),
        });
    }
  );

// ---------------------------------------------------------------------------
// Followers
// ---------------------------------------------------------------------------

export const addFollower = functions.firestore
  .document('/following/{userId}/userFollowing/{FollowingId}')
  .onCreate(
    (
      _snap: functions.firestore.QueryDocumentSnapshot,
      context: functions.EventContext
    ): Promise<FirebaseFirestore.WriteResult> => {
      return db
        .collection('users')
        .doc(context.params.FollowingId)
        .update({
          followersCount: admin.firestore.FieldValue.increment(1),
        })
        .then((): Promise<FirebaseFirestore.WriteResult> => {
          return db
            .collection('users')
            .doc(context.params.userId)
            .update({
              followingCount: admin.firestore.FieldValue.increment(1),
            });
        });
    }
  );

export const removeFollower = functions.firestore
  .document('/following/{userId}/userFollowing/{FollowingId}')
  .onDelete(
    (
      _snap: functions.firestore.QueryDocumentSnapshot,
      context: functions.EventContext
    ): Promise<FirebaseFirestore.WriteResult> => {
      return db
        .collection('users')
        .doc(context.params.FollowingId)
        .update({
          followersCount: admin.firestore.FieldValue.increment(-1),
        })
        .then((): Promise<FirebaseFirestore.WriteResult> => {
          return db
            .collection('users')
            .doc(context.params.userId)
            .update({
              followingCount: admin.firestore.FieldValue.increment(-1),
            });
        });
    }
  );

// ---------------------------------------------------------------------------
// Comments
// ---------------------------------------------------------------------------

export const addComment = functions.firestore
  .document('/posts/{creatorId}/userPosts/{postId}/comments/{userId}')
  .onCreate(
    (
      _snap: functions.firestore.QueryDocumentSnapshot,
      context: functions.EventContext
    ): Promise<FirebaseFirestore.WriteResult> => {
      return db
        .collection('posts')
        .doc(context.params.creatorId)
        .collection('userPosts')
        .doc(context.params.postId)
        .update({
          commentsCount: admin.firestore.FieldValue.increment(1),
        });
    }
  );
