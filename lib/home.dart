import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  const Home();

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return Text(
      'Welcome to Kurry, an opensource cook platform to manage your recipes and much more!',
      style: textTheme.bodyText1,
    );
  }
}
