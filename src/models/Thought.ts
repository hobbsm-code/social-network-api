import { Schema, Types, Document, ObjectId, model } from 'mongoose';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: IReaction[];
}

interface IReaction {
    reactionId: ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    },
    {
        toJSON: {
            getters: true,
        },
        timestamps: true,
        id: false,
    }
);

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

reactionSchema.virtual('formattedDate').get(function (this: IReaction) {
    return this.createdAt.toLocaleDateString();
});

thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions.length;
});

const Thought = model<IThought>('thought', thoughtSchema);

export default Thought;
