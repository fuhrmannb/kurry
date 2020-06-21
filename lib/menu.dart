import 'package:flutter/material.dart';
import 'package:kurry/app.dart';
import 'package:kurry/recipe/recipe_list.dart';

class Menu extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        DrawerHeader(
          decoration: BoxDecoration(
            color: Colors.blue,
          ),
          child: Text(
            'Kurry',
            style: TextStyle(
              color: Colors.white,
              fontSize: 24,
            ),
          ),
        ),
        MenuTile(
          icon: Icons.home,
          title: 'Home',
          route: homeRoute,
        ),
        MenuTile(
          icon: Icons.collections_bookmark,
          title: 'Recipes',
          route: recipeRoute,
        ),
        MenuTile(
          icon: Icons.help,
          title: 'About',
          route: aboutRoute,
        ),
      ],
    );
  }
}

class MenuTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final String route;

  const MenuTile({this.icon, this.title, this.route = ''}) : super();

  @override
  Widget build(BuildContext context) {
    var currentRoute = ModalRoute.of(context).settings.name;
    var active = currentRoute == homeRoute
        ? route == currentRoute
        : route.startsWith(ModalRoute.of(context).settings.name);
    return ListTile(
      leading: Icon(icon),
      title: Text(title),
      onTap: () {
        if (!active) {
          Navigator.pushNamed(context, route);
        }
      },
      selected: active,
    );
  }
}
