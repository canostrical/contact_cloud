# Contact Cloud

!!! DOES NOT WORK ON MOBILE YET !!!

[live demo](https://canostrical.github.io/contact_cloud/)

Experiment in visualizing [Nostr Contact List](https://github.com/nostr-protocol/nips/blob/master/02.md) graph.

Ideally closeness of points might be used for recommending Nostr pubkeys to follow.

Uses data from https://sps.bio that is colored via [Louvain](https://pkg.go.dev/gonum.org/v1/gonum/graph/community#Modularize) community detection and arranged in 2D via [force direction (Force2Vec)](https://github.com/HipGraph/Force2Vec).

Processed were all contact list events of roughly the last 30 days before 2023-07-28.

Built by [@jraedisch/npub1hz404lnj7lxsdt5vxdlex9rlvhlz6dxqqed4y6tpywvzgwx0qmlqfpl6sm](nostr:npub1hz404lnj7lxsdt5vxdlex9rlvhlz6dxqqed4y6tpywvzgwx0qmlqfpl6sm).
