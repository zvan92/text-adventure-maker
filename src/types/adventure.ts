export interface Choice {
  text: string;
  targetNodeId: string;
}

export interface StoryNode {
  id: string;
  title: string;
  content: string;
  choices: Choice[];
  isStart?: boolean;
  isEnding?: boolean;
}

export interface Adventure {
  _id?: string;
  title: string;
  description: string;
  nodes: StoryNode[];
  createdAt?: string;
  updatedAt?: string;
} 